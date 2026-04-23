# Expense Tracker

A full-stack, production-ready application to help you monitor and manage your daily expenses across various categories. Designed with a clean, modern glassmorphism aesthetic, this tool allows you to effortlessly track where your money is going. 

The application is resilient and handles real-world scenarios, such as network retries and duplicate submissions, using an idempotency key mechanism.

**Live Demo:** [Render Link](https://expense-tracker-1-1omc.onrender.com/)  
*(Note: As this is hosted on Render's free tier, please allow up to 50 seconds for the initial cold start when logging in for the first time.)*

---

## 🛠️ Tech Stack

### Backend
- **Go**: Fast, statically typed, and excellent for backend APIs.
- **Gin**: High-performance HTTP web framework.
- **GORM**: Developer-friendly ORM for Go.
- **PostgreSQL**: Robust, open-source relational database.

### Frontend
- **React 19**: Modern component-based UI library.
- **TypeScript**: For static type safety and enhanced developer experience.
- **Vite**: Lightning-fast frontend build tool.
- **Axios & React Router**: For API communication and client-side routing.

> **Why PostgreSQL?**  
> A relational database like PostgreSQL was chosen over simple JSON or SQLite because an expense tracker inherently deals with structured relational data (Users and Expenses). PostgreSQL ensures robust data integrity, supports complex filtering/sorting queries effortlessly, and provides excellent concurrency handling for production environments.

---

## 🚀 Features

- **User Authentication**: Secure signup and login functionality using JWT.
- **Expense Management**: Add new expenses with amounts, categories, dates, and descriptions.
- **Smart Filtering & Sorting**: Filter your expenses by category and sort them chronologically.
- **Real-time Totals**: Automatically calculates and displays the total sum of your visible expenses.
- **Network Resilience**: Uses an `idempotency_key` strategy on the backend to prevent duplicate expense creation in case of network drops or accidental double-clicks.
- **Beautiful UI**: A responsive, premium interface leveraging modern CSS techniques (glassmorphism, soft gradients, and custom scrollbars).

---

## 💻 Local Development Setup

To run this project locally, ensure you have **Go**, **Node.js**, and a running instance of **PostgreSQL** installed on your machine.

### 1. Database & Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file in the `backend` directory (or modify the existing one) with your PostgreSQL credentials:
   ```env
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=expense-tracker
   DB_SECURITY=sslmode=disable
   ```
3. Run the Go server. GORM will automatically migrate the database tables for you:
   ```bash
   go run .
   ```
   *The backend will start running on `http://localhost:8082`.*

### 2. Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Create a `.env` file in the `frontend` directory and specify the backend API URL:
   ```env
   VITE_BASE_URL=http://localhost:8082/api/v1
   ```
3. Install the dependencies and start the Vite development server:
   ```bash
   npm install
   npm run dev
   ```
   *The frontend will start running on `http://localhost:5173`.*

---

## 💡 Usage

1. Open `http://localhost:5173` in your browser.
2. Create a new account or log in.
3. Start adding your expenses, selecting categories, and managing your finances!
