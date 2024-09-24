# Mental Health Progress Tracker

This is a web application that helps users track their mental health progress. Users can log their daily activities such as mood rating, anxiety level, sleep quality, and more. The application provides visual representations of the user's progress over time using graphs and allows users to interact in real-time via WebSocket updates.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Backend API Endpoints](#backend-api-endpoints)
- [WebSocket Integration](#websocket-integration)
- [Project Structure](#project-structure)

## Features

- Google Authentication for user login.
- Logging daily metrics related to mental health such as mood, anxiety, sleep, physical activity, etc.
- View logs in tabular form with date/time and activity details.
- Generate graphs based on logs over weekly or monthly periods.
- Real-time updates for logs using WebSockets.
- Data persistence using SQLite.

## Technologies

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js, SQLite
- **Authentication**: Google OAuth 2.0
- **WebSocket**: Socket.io

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+)
- **SQLite** (3.0+)

### Clone the repository

```bash
git clone https://github.com/chrisdoctor/mental-health-progress-tracker.git
cd mental-health-progress-tracker
```

### Backend Setup

1. Create a `.env` file in the `backend` folder and set the following environment variables:

```bash
GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-client-secret
PORT=4000
APP_BASE_URL=http://localhost:4000
REACT_APP_BASE_URL=http://localhost:3000
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Start the backend server:

```bash
npm start
```

### Frontend Setup

1. Create a .env file in the frontend folder and set the following environment variables:

```bash
REACT_APP_BACKEND_URL=http://localhost:4000
REACT_APP_GOOGLE_CLIENT_ID=google-client-id
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Start the frontend application:

```bash
npm start
```

## Running the Application

- Open your browser and navigate to `http://localhost:3000`.
- Click on "Login with Google" to authenticate and access the application.
- Once logged in, you can:
  - **Add Daily Logs**: Track your daily mental health metrics such as mood, anxiety level, and more.
  - **View Logs**: See your past logs displayed in a table format with details such as date, mood, and symptoms.
  - **Generate Graphs**: Select metrics and time periods (weekly or monthly) to generate graphs showing your mental health trends over time.
- The application will automatically update with real-time log entries using WebSockets.

## Backend API Endpoints

The backend provides several API endpoints for managing user authentication and daily logs.

| Method | Endpoint                | Description                                                                     | Protected |
| ------ | ----------------------- | ------------------------------------------------------------------------------- | --------- |
| `GET`  | `/auth/google`          | Initiates Google OAuth authentication                                           | No        |
| `GET`  | `/auth/google/callback` | Callback for Google OAuth to handle the token exchange and redirect after login | No        |
| `POST` | `/api/log`              | Creates a new daily log for the authenticated user                              | Yes       |
| `GET`  | `/api/logs`             | Retrieves all logs for the authenticated user in descending order by date       | Yes       |

### Authentication

- **Google OAuth**: The backend handles user authentication using Google OAuth. Once authenticated, a token is returned to the frontend for session management.

### Protected Endpoints

- **Authorization**: All endpoints under `/api` are protected and require the client to send the token in the `Authorization` header in the following format:

## WebSocket Integration

The application integrates WebSocket functionality using `socket.io` to provide real-time updates for the daily logs. When a user submits a new daily log, the backend broadcasts the updated log data to all connected clients. This ensures that users see updates immediately, without the need for a manual refresh.

### Backend WebSocket Setup

- The WebSocket connection is established on the backend via `socket.io`. The backend emits an event named `logUpdated` whenever a new daily log is added to the database.
- The WebSocket server is attached to the existing Express server and shares the same port.

### Frontend WebSocket Implementation

- On the frontend, the WebSocket connection is initialized using `socket.io-client`. The client listens for the `logUpdated` event and updates the list of daily logs in real-time when a new log is received.
- The client ensures that logs are updated seamlessly in the UI without requiring the user to refresh the page.

### WebSocket Flow

1. When a user creates a new daily log, the backend inserts the log into the database and emits a `logUpdated` event with the log data.
2. All connected clients (including the one that submitted the log) receive this event, and the log is added to the displayed list in real-time.
3. The WebSocket connection is cleaned up when the user navigates away from the log view, ensuring efficient resource usage.

## Project Structure

The project is organized into two main parts: **frontend** and **backend**. Each part has its own folder structure, codebase, and dependencies. Below is an overview of the folder structure for both the frontend and backend.

### Backend Structure

The backend is built using **Node.js**, **Express**, and **SQLite** for handling user authentication, daily logs, and WebSocket connections.

└── backend/ # Backend code (Node.js, Express, SQLite)

    ├── controllers/ # API Controllers
    ├── middleware/ # Auth Middleware
    ├── routes/ # API Routes
    ├── db/ # SQLite Database setup
    └── server.js # Express server

### Frontend Structure

The frontend is built using **React** and **Tailwind CSS** for user interface, along with **Socket.io-client** for real-time updates.

└── frontend/ # Frontend code (React, TailwindCSS)

    ├── src/ # React Components, Context, etc.
    └── public/ # Static assets (index.html, etc.)
