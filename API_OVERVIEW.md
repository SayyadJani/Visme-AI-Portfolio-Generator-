# Portfolio Automation Tool - API Documentation

This document provides a comprehensive overview of all implemented API endpoints in the system. The project uses a multi-server architecture:
- **Server 1 (Primary API)**: Handles auth, project management, resume parsing, and orchestration.
- **Server 2 (Runtime Agent)**: Manages live previews (Vite dev servers).

---

## 🔐 1. Authentication APIs (Server 1)
Base URL: `/api/auth`

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/register` | POST | Registers a new user with email and password. Returns an access token and sets a refresh token cookie. | No |
| `/login` | POST | Authenticates user credentials. Returns access token + refresh token cookie. | No |
| `/logout` | POST | Invalidates the current session and clears cookies. | Yes |
| `/refresh` | POST | Generates a new access token using the refresh token from the cookie. | No |

---

## 📂 2. Project Management APIs (Server 1)
Base URL: `/api/projects`

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/templates` | GET | Returns a list of available portfolio templates. | Yes |
| `/` | GET | Lists all projects owned by the authenticated user. | Yes |
| `/create` | POST | Creates a new project instance from a specified template. | Yes |
| `/:id/files` | GET | Returns the file tree structure for the project (for IDE sidebar). | Yes |
| `/:id/files/*` | GET | Retrieves the content of a specific file (e.g., `/files/src/App.tsx`). | Yes |
| `/:id/files/*` | PUT | Saves/Updates the content of a specific file. | Yes |

---

## 📄 3. Resume Parsing APIs (Server 1)
Base URL: `/api/resume`

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/parse` | POST | Uploads a PDF resume (multipart/form-data). Parses it using AI and returns structured data. | Yes |
| `/upload` | POST | Alias for `/parse`. | Yes |

---

## 👁️ 4. Preview APIs (Server 1 Server 2)
Base URL: `/api/preview`

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/:projectId/start` | POST | Spins up a Vite dev server on Server 2 and returns the preview URL. | Yes |
| `/:projectId/stop` | POST | Terminates the running preview instance on Server 2. | Yes |
| `/:projectId/status` | GET | Returns whether a preview is currently active and its port. | Yes |

---

## 🚀 5. Deployment APIs (Server 1)
Base URL: `/api/deploy`

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/:projectId` | POST | Queues a build and deployment task for Cloudinary/Production. | Yes |
| `/:deployId/status` | GET | Polls the status of a specific deployment (QUEUED, BUILDING, COMPLETED, FAILED). | Yes |

---

## 🛠️ 6. Admin APIs (Server 1)
Base URL: `/api/admin`

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/templates/upload` | POST | Uploads a new portfolio template bundle (.zip/.folder). | No (Dev Only) |

---

## 💓 7. Utility APIs
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Returns the system health status and timestamp. |
| `/users` | GET | (Debug) Returns a list of all users in the database. |

---

## Technical Appendix: Internal Communication
- **Server 1** communicates with **Server 2** via internal HTTP calls to:
  - `POST /assign`: Requests Server 2 to start a project instance.
  - `POST /release`: Requests Server 2 to stop a project instance.
- **Environment**: All routes (except auth/health) require a Bearer JWT token in the `Authorization` header.
