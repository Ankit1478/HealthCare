# Healthcare Project

## Description
Healthcare is a web application that allows users to sign up, sign in, ask health-related queries to a chatbot, and get real-time responses. Users can also see chat interactions with each doctor, along with the date and time. The application features a responsive and beautiful UI.

## Tech Stack
- **Frontend**: React with TypeScript
- **Backend**: Node.js with JavaScript
- **Authentication**: JWT for session management and authentication
- **Password Security**: bcrypt library for hashing passwords
- **Database**: MongoDB
- **Containerization**: Docker for both React and Node.js
- **Version Control**: Git with GitHub Actions for Continuous Integration (CI)

## Features
- User sign-up and sign-in
- Real-time chatbot for health-related queries
- View chat interactions with doctors
- Date and time stamps for each interaction
- Responsive and beautiful UI

## Continuous Integration (CI)
This project implements CI using GitHub Actions. The provided `build.yml` workflow file automates the build process of the application, ensuring code changes are frequently integrated and verified.

### CI Concepts
- **Automation**: The workflow triggers automatically on code changes (push or pull request to the main branch).
- **Building**: The backend and frontend Docker images are built to ensure code changes do not break the build process.
- **Dependency Management**: Necessary dependencies for both the backend and frontend are installed, ensuring a consistent build environment.
- **Early Detection of Issues**: By automating the build process, issues can be detected and addressed early.

## Running the Project

### Using npm

#### Frontend
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
