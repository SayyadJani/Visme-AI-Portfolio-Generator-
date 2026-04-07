import axios from 'axios'
import { sleep } from '@repo/shared-utils'
import { env } from '../config/env'

const vercelClient = axios.create({
  baseURL: 'https://api.vercel.com',
  headers: {
    Authorization:  `Bearer ${env.VERCEL_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

// ── Deploy a GitHub repo to Vercel ───────────────────────────────────────
export const deployToVercel = async (
  repoName:    string,
  projectName: string,
  repoId:      number,
  ref:         string = 'main',
): Promise<{ deploymentId: string }> => {

  const payload: Record<string, unknown> = {
    name: projectName,
    gitSource: {
      type:   'github',
      repoId: repoId,
      ref:    ref,
    },
    projectSettings: {
      framework: 'nextjs', // Set to nextjs to match your current template
    },
  }

  if (env.VERCEL_TEAM_ID) {
    payload.teamId = env.VERCEL_TEAM_ID
  }

  try {
    const response = await vercelClient.post('/v13/deployments', payload)
    return { deploymentId: response.data.id }
  } catch (err: any) {
    if (err.response?.data?.error) {
        const { code, message } = err.response.data.error;
        console.error(`[Vercel API Error] ${code}: ${message}`);
        throw new Error(`Vercel Deployment Failed: ${message}`);
    }
    throw err;
  }
}

// ── Poll until deployment is ready → return live URL ─────────────────────
// Polls every 4 seconds for up to 2 minutes.
export const waitForDeployment = async (
  deploymentId: string
): Promise<string> => {

  for (let attempt = 0; attempt < 30; attempt++) {
    await sleep(4000)

    const res = await vercelClient.get(`/v13/deployments/${deploymentId}`)
    const { readyState, url } = res.data

    if (readyState === 'READY') {
      return `https://${url}`
    }

    if (readyState === 'ERROR' || readyState === 'CANCELED') {
      throw new Error(`Vercel deployment failed with state: ${readyState}`)
    }

    // States: INITIALIZING → BUILDING → READY (or ERROR)
    console.log(`[Vercel] attempt ${attempt + 1}: state = ${readyState}`)
  }

  throw new Error('Vercel deployment timed out after 2 minutes')
}

// ── Get latest deployment URL for a project ───────────────────────────────
// Used after git push to confirm the rebuild completed.
export const getLatestDeploymentState = async (
  vercelProjectName: string
): Promise<{ state: string; url: string }> => {

  const params: Record<string, string> = { limit: '1' }
  if (env.VERCEL_TEAM_ID) params.teamId = env.VERCEL_TEAM_ID

  const res = await vercelClient.get(
    `/v6/deployments?projectId=${vercelProjectName}`,
    { params }
  )

  const latest = res.data.deployments[0]
  return { state: latest.state, url: `https://${latest.url}` }
}
