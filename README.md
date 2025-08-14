---

# 📝 Task Manager — MERN Stack Application

![MERN](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

> A **modern, full-featured task management app** with authentication, role-based access, and a responsive UI built using the **MERN stack**.

---

## 🌟 Features

* 🔐 **JWT Authentication** — Secure login & registration
* 👥 **Role-Based Access Control** — Admin vs. regular users
* ✅ **Full CRUD for Tasks** — Create, read, update, delete
* 🔍 **Task Filtering & Search** — Quickly find what you need
* 📱 **Responsive UI** — Works on mobile, tablet, and desktop
* 🎨 **Tailwind CSS + Radix UI** — Modern design system
* ⚡ **Vite-powered Frontend** — Fast builds & hot reloads

---

## 🏗 Tech Stack

**Frontend**

* React (Hooks & Context)
* Vite
* Tailwind CSS
* Radix UI Components

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint

# Preview production build
pnpm preview
```

**Backend**

* Node.js + Express.js
* MongoDB + Mongoose
* JWT Authentication
* Role-based Middleware
  
```bash
# Start development server (with nodemon)
pnpm dev
```

---

## 📂 Project Structure

```
Task-Manager/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API integration layer
│   │   ├── utils/           # Helper functions & ProtectedRoute
│   │   └── styles/          # Tailwind & custom styles
│   └── package.json
│
└── server/                  # Express backend
    ├── config/              # DB & environment configs
    ├── controllers/         # Business logic
    ├── middleware/          # Auth, error handling
    ├── models/              # Mongoose schemas
    ├── routes/              # API endpoints
    └── package.json
```

---

## 🔄 Data Flow

1. **User registers/logs in** → Server issues a JWT token
2. **Frontend stores token** in `localStorage`
3. **All API requests** go through the `API` service (`src/services/api.js`)
4. **Backend authenticates token** before granting access to protected routes
5. **MongoDB stores & retrieves data** via Mongoose models

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone: https://github.com/Sainttyga/MERN-Stack_Task-Manager.git
cd task-manager
```

### 2️⃣ Install dependencies

```bash
# Install frontend dependencies
cd client
pnpm install

# Install backend dependencies
cd ../server
pnpm install
```

### 3️⃣ Configure Environment

Create `.env` file in `server/`:

```
PORT=5000
MONGO_URI=mongodb+srv://your-db-uri
JWT_SECRET=your-jwt-secret
```

### 4️⃣ Start the application

```bash
# Start backend
cd server
pnpm dev

# Start frontend
cd ../client
pnpm dev
```

---

## 📌 API Endpoints

### **Auth**

| Method | Endpoint             | Description         | Auth Required |
| ------ | -------------------- | ------------------- | ------------- |
| POST   | `/api/auth/register` | Register a new user | ❌             |
| POST   | `/api/auth/login`    | Login and get token | ❌             |

### **Tasks**

| Method | Endpoint         | Description              | Auth Required |
| ------ | ---------------- | ------------------------ | ------------- |
| GET    | `/api/tasks/me`  | Get current user's tasks | ✅             |
| POST   | `/api/tasks`     | Create a new task        | ✅             |
| PUT    | `/api/tasks/:id` | Update a task            | ✅             |
| DELETE | `/api/tasks/:id` | Delete a task            | ✅             |

---

## 💡 Usage Examples

**Fetch user’s tasks:**

```javascript
API.get("/tasks/me");
```

**Create a new task:**

```javascript
API.post("/tasks", { title: "New Task", completed: false });
```

**Protect a route in React:**

```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

---

## 🛠 Development Notes

* Always use the **centralized API service** to ensure tokens are sent.
* Reuse **existing hooks/components** before creating new ones.
* Follow **Tailwind utility-first classes** for styling consistency.
* Check **role-based access** in controllers before modifying tasks.

---

## 📜 License
Copyright (c) **2025 Lindokuhle Zwane**
---
