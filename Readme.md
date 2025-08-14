# Project Setup Guide

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or above recommended) → [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB**
  - Option 1: Use **MongoDB Atlas (Cloud)** — get your connection string from [MongoDB Cloud](https://www.mongodb.com/cloud/atlas)
  - Option 2: Install MongoDB locally → [Download MongoDB](https://www.mongodb.com/try/download/community)

---

## 📥 Clone the Repository

```bash
git clone https://github.com/MitreshPrajapati/rahane-ai-tech-assignment
```

---

## 📂 Install Dependencies

### **Frontend**

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create a .env file in frontend folder
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
# Make sure the port matches your backend server's port
```

### **Backend (Server)**

```bash
# Navigate to server folder
cd ../server

# Install dependencies
npm install

# Copy environment example file and set variables
cp .env.example .env

# Open .env and configure your environment variables:
# Example:
# PORT=8080
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
# JWT_SECRET=your_secret_key
```

---

## ▶️ Running the Project

### **Start the Backend**

```bash
cd server
npm run dev
```

### **Start the Frontend**

```bash
cd frontend
npm run dev
```

---

## ⚠️ Important

- Ensure **PORT** in the backend `.env` matches `NEXT_PUBLIC_API_BASE_URL` in the frontend `.env`.
- If using MongoDB locally, start it before running the backend:
  ```bash
  mongod
  ```

---

✅ You’re now ready to develop and run the project!
