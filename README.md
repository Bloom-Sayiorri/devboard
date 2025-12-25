🧩 DevBoard

DevBoard is a full-stack project management platform designed to help teams organize work, track progress, and collaborate efficiently. It provides structured boards, sprints, and tasks, making it easy to manage projects from planning to completion.

✨ Features

User authentication and authorization

Project boards with team members and roles

Sprint and task management

Task assignments and progress tracking

Notifications and activity updates

Clean, responsive dashboard interface

### 🧱 Tech Stack

Frontend: React / Next.js

Backend: Node.js (API routes / server)

Database: PostgreSQL (via Prisma)

Authentication: Auth.js

API: REST

### 📁 Project Structure
├── app/   # React / Next.js application
└── README.md   # Project overview (this file)


Each folder contains its own README with detailed setup and run instructions.

### 🚀 Getting Started

To run DevBoard locally:

- Run ``` $ npm install ```

-Then run ``` $ npm run dev ``` to start the application on http://localhost:3000


Ensure your environment variables are configured correctly for authentication and database access.

### 🧪 Development Notes

Authentication and session handling are managed via Auth.js

Role-based access control is used for boards and tasks