# 🧠 Task Manager – Fullstack App

A simple fullstack Task Manager built with:

- 📦 **Backend**: Node.js, Express, MongoDB (Mongoose)
- 🎨 **Frontend**: React, Vite, Tailwind CSS
- ☁️ **Deployed**:
  - **Backend** → Render
  - **Frontend** → Vercel

---

## 🌐 Live Demo

🔗 Frontend: https://task-manager-fullstack-two.vercel.app/

🔗 Backend API: [https://task-manager-api-oi9w.onrender.com/tasks](https://task-manager-api-oi9w.onrender.com/tasks)

---

## 🧱 Features

- Create, view, and delete tasks
- Toggle tasks as complete/incomplete
- Responsive and polished UI (Tailwind CSS)
- RESTful API built with Express
- MongoDB integration using Mongoose

---

## 🧪 Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/task-manager-fullstack.git
cd task-manager-fullstack
```
---

### 2. Start the backend

```bash
cd backend
npm install
touch .env
```

Create a `.env` file with:

```env
MONGO_URI=your_mongodb_connection_string
```

Then:

```bash
npm start
```

The backend will run on `http://localhost:3001`.

---

### 3. Start the frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.

Make sure `App.jsx` points to your local backend:

```js
const API = 'http://localhost:3001';
```

---

## 🗂️ Project Structure

```
task-manager-fullstack/
├── backend/        → Node.js + Express + MongoDB API
├── frontend/       → React + Vite + Tailwind UI
```

---

## 🛠️ Tech Stack

| Layer     | Tech                                  |
|-----------|---------------------------------------|
| Frontend  | React, Vite, Tailwind CSS             |
| Backend   | Node.js, Express.js, Mongoose         |
| Database  | MongoDB (Atlas)                       |
| Hosting   | Render (API), Vercel (UI)             |

---


## 🚀 Future Improvements

- Edit tasks ✏️
- Add due dates ⏰
- Filter by completed/pending ✅
- Use `.env` in frontend with `VITE_API_URL`
- Add Auth0 for identity access management
