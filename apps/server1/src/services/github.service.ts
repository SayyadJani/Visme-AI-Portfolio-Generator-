import axios from 'axios'
import { env } from '../config/env'

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 30000, 
  headers: {
    Authorization:  `token ${env.GITHUB_TOKEN}`,
    Accept:         'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
})

// ── Create a new repo from a template repo ───────────────────────────────
// Uses GitHub's "Generate from Template" API — NOT fork.
export const createRepoFromTemplate = async (
  templateRepo: string,    // e.g. "your-org/template-minimal"
  newRepoName:  string,    // e.g. "portfolio-user123-abc"
): Promise<{ repoName: string; repoUrl: string; cloneUrl: string }> => {

  const response = await githubClient.post(
    `/repos/${templateRepo}/generate`,
    {
      owner:                env.GITHUB_ORG,
      name:                 newRepoName,
      description:          `Portfolio site — ${newRepoName}`,
      private:              false,   // must be public for Vercel free tier
      include_all_branches: false,
    }
  )

  return {
    repoName: response.data.name,
    repoUrl:  response.data.html_url,
    cloneUrl: response.data.clone_url,
  }
}

// ── Create a NEW empty repo ──────────────────────────────────────────────
export const createRepo = async (
  newRepoName:  string,
): Promise<{ repoName: string; repoUrl: string; cloneUrl: string; repoId: number }> => {

  const response = await githubClient.post(
    `/user/repos`,
    {
      name:                 newRepoName,
      description:          `Portfolio site — ${newRepoName}`,
      private:              false,   // must be public for Vercel free tier
      auto_init:            false,   // stay empty so we can push our own code
    }
  )

  return {
    repoName: response.data.name,
    repoUrl:  response.data.html_url,
    cloneUrl: response.data.clone_url,
    repoId:   response.data.id, // Store the numeric ID for Vercel
  }
}

// ── Cleanup Helper: Delete a repo on failure ─────────────────────────────
export const deleteRepo = async (repoName: string): Promise<void> => {
  try {
      await githubClient.delete(`/repos/${env.GITHUB_USER}/${repoName}`)
      console.log(`[GitHub] Cleaned up orphaned repository: ${repoName}`)
  } catch (err) {
      console.warn(`[GitHub] Could not delete repo ${repoName}:`, err)
  }
}

// ── Check repo exists ────────────────────────────────────────────────────
export const repoExists = async (repoName: string): Promise<boolean> => {
  try {
    await githubClient.get(`/repos/${env.GITHUB_USER}/${repoName}`)
    return true
  } catch {
    return false
  }
}
