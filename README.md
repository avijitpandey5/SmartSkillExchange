# Smart Skill Exchange Platform

A complete, full-stack enterprise platform allowing users to teach and learn skills using a credit-based economy. Built precisely matching requirements with Spring Boot (Java), MySQL, and a beautiful Angular frontend featuring Tailwind CSS glassmorphism aesthetics.

## Folder Structure

```
c:\Users\aviji\OneDrive\Desktop\Sprint\
│
├── database/
│   └── schema.sql        # MySQL Initialization Script
│
├── backend/              # Spring Boot Java Backend
│   ├── pom.xml           # Maven descriptor
│   └── src/main/java/com/smartexchange/...
│
└── frontend/             # Angular 17+ Modern SPA
    ├── package.json
    ├── tailwind.config.js
    └── src/app/...       # Standalone UI components (Auth, Dashboard, Wallet, Match)
```

## How to Run The Project

### Step 1: Database Setup
1. Open your MySQL client (Workbench or CLI).
2. Create a connection as `root` with `password` (or match your local credentials in `backend/src/main/resources/application.properties`).
3. Run the complete SQL script located at:
   `c:\Users\aviji\OneDrive\Desktop\Sprint\database\schema.sql`.

### Step 2: Running Backend (Spring Boot)
1. Open up a terminal and navigate to the `backend` directory:
   ```bash
   cd c:\Users\aviji\OneDrive\Desktop\Sprint\backend
   ```
2. Run the Maven wrapper or command to boot the application. If you have Maven installed globally:
   ```bash
   mvn spring-boot:run
   ```
   *The server will start on `http://localhost:8080/`.*

### Step 3: Running Frontend (Angular)
1. Open another terminal and navigate to the `frontend` directory:
   ```bash
   cd c:\Users\aviji\OneDrive\Desktop\Sprint\frontend
   ```
2. Install the necessary Node dependencies using npm.
   ```bash
   npm install --force
   ```
   *(Note: using `--force` handles strict peer dependencies quickly for Tailwind/Angular17).*
3. Start the Angular Development Server:
   ```bash
   npm start
   ```
   *The app will be accessible at `http://localhost:4200/`.*

## Features Implemented
- **JWT Authentication**: Full role-based logging and token interception (`Learner`, `Mentor`, `Admin`).
- **Premium User Interface**: Glassmorphism dashboard designs, dynamic responsive grids, and clean sidebar navigation.
- **Credit Wallet System**: Transactions process 2 credits mathematically when a session completes from the learner to the mentor.
- **Skill Matching**: Users can register local skills and pull down available mentors dynamically.
- **Live Chat Mockups**: Pre-designed components mirroring real-time message feeds.

Enjoy exploring the application!
