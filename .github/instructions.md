# Instructions for Task-Manager Codebase

## Overview
This is a full-stack MERN (MongoDB, Express, React, Node.js) task manager application. The codebase is split into two main folders:
- `client/`: React + Vite frontend
- `server/`: Express backend with MongoDB

## Architecture & Data Flow
- **Frontend (`client/`)**: Uses React (with hooks), Vite for dev/build, Tailwind CSS for styling, and Radix UI for components. State and API calls are managed via React hooks and a custom `API` service (`src/services/api.js`).
- **Backend (`server/`)**: Express app with RESTful routes for authentication and task management. MongoDB is accessed via Mongoose models (`models/`).
- **Communication**: Frontend communicates with backend via HTTP requests to `/api/auth` and `/api/tasks` endpoints. Auth tokens are stored in `localStorage` and sent as Bearer tokens in requests.

## Developer Workflows
- **Frontend**:
  - Start dev server: `pnpm dev` (in `client/`)
  - Build: `pnpm build`
  - Lint: `pnpm lint`
  - Preview: `pnpm preview`
- **Backend**:
  - Start dev server: `pnpm dev` (in `server/`, uses `nodemon`)
  - Environment variables loaded from `.env` (not committed)

## Key Patterns & Conventions
- **API Service**: All HTTP requests use the `API` instance in `src/services/api.js`. Auth tokens are automatically attached.
- **Protected Routes**: Use `utils/ProtectedRoute.jsx` for route protection in React.
- **Task Operations**: CRUD operations for tasks are handled via REST endpoints (`server/controllers/taskController.js`).
- **Role-Based Access**: Backend checks user roles for authorization (admin vs. regular user) when updating/deleting tasks.
- **Component Organization**: UI components are modularized under `src/components/` and `src/components/ui/`.
- **Styling**: Tailwind CSS is used throughout. Some animated styles via `tw-animate-css`.

## Integration Points
- **MongoDB**: Connection managed in `server/config/database.js`.
- **Authentication**: JWT-based, with middleware in `server/middleware/auth.js`.
- **Frontend/Backend URLs**: Frontend expects backend at `http://localhost:5000/api` (see `src/services/api.js`).

## Examples
- To fetch tasks for the current user: `API.get("/tasks/me")` in React, handled by `getTasks` in backend.
- To create a task: `API.post("/tasks", payload)` in React, handled by `createTask` in backend.
- To protect a route: wrap with `<ProtectedRoute />` in React.

## Tips for AI Agents
- Always use the provided API service for HTTP requests.
- Respect role-based access logic in backend controllers.
- Follow the established folder structure for new components/services.
- Use Tailwind utility classes for styling.
- Check for existing hooks/components before creating new ones.

---
