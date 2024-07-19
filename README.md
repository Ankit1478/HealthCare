# Healthcare Project 
[Live link](https://heathcarefronted.vercel.app/)


## Description
Healthcare is a web application that allows users to sign up, sign in, ask health-related queries to a chatbot, and get real-time responses. Users can also see chat interactions with each doctor, along with the date and time. The application features a responsive and beautiful UI.

## Tech Stack
- **Frontend**: React with TypeScript and Tailwind CSS 
- **Backend**: Node.js with JavaScript
- **Authentication**: JWT , ZOD  for session management and authentication
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


## Zod for Robust Data Validation
- This project leverages the powerful Zod library (https://zod.dev/) to ensure the integrity and security of user-provided data, particularly for email addresses, 
   names, and passwords.
## Zod's Advantages:
- Type Safety (TypeScript-first): Zod enforces type safety, preventing runtime errors and improving code maintainability.
- Concise Syntax: It offers a clear and concise syntax for defining data schemas, making validation logic easy to read and understand.
- Expressive Validations: Zod supports a rich set of built-in validation methods (e.g., email(), min(), max()) and custom validation functions for complex 
  requirements.
- User-Friendly Error Messages: Zod provides informative error messages, aiding in debugging and user experience.

- ```
  const { z } = require('zod');
   const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  age: z.number().int().positive(),
  gender: z.string(),
  });

  const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  });

   const chatSchema = z.object({
     specialization: z.string().min(1),
     query: z.string().min(1),
     doctorId: z.string().min(1),
   });
   module.exports = { signupSchema, loginSchema, chatSchema };
  
## Running the Project

### Using npm

#### Frontend
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
2. Install dependencies:
    ```sh
   npm install
3. Start the development server:
   ```sh
    npm run dev
#### Backend
1. Navigate to the backend directory:
   ```sh
    cd backend
2. Install dependencies:
   ```sh
    npm i 
3. Start the development server:
   ```sh
   node or nodemon server.js

## Using Docker
### Fronted 
1. Build the Docker image: 
     ```sh
   docker build -t your_frontend_image_name .
2. Run the Docker container:
   ```sh
   docker run -p your_port:your_port your_frontend_image_name

### Backend
1. Build the Docker image: 
     ```sh
   docker build -t your_backend_image_name .
2. Run the Docker container:
   ```sh
   docker run -p your_port:your_port your_frontend_image_name

#### GitHub Actions Workflow
## A sample GitHub Actions workflow (.github/workflows/build.yml) is provided to automate the build process:
  ```sh
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
    
jobs:
  build-backend:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:4.4.3
        ports:
          - 27017:27017

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18.16.0

      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('backend/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install dependencies
        run: npm install
        working-directory: ./backend

      - name: Run tests
        run: npm test
        working-directory: ./backend

      - name: Build Docker image
        run: docker build -t backend-app ./backend

      - name: Log in to Docker Hub
        run: echo ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }} | docker login -u ${{ secrets.DOCKER_HUB_USERNAME }} --password-stdin

      - name: Tag and push image
        run: |
          docker tag backend-app:latest ${{ secrets.DOCKER_HUB_USERNAME }}/backend-app:latest
          docker push ${{ secrets.DOCKER_HUB_USERNAME }}/backend-app:latest

  build-frontend:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('frontend/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install dependencies
        run: npm install --legacy-peer-deps
        working-directory: ./frontend

      - name: Run tests
        run: npm test
        working-directory: ./frontend

      - name: Build frontend
        run: npm run build
        working-directory: ./frontend

      - name: Build Docker image
        run: docker build -t frontend-app ./frontend

      - name: Log in to Docker Hub
        run: echo ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }} | docker login -u ${{ secrets.DOCKER_HUB_USERNAME }} --password-stdin

      - name: Tag and push image
        run: |
          docker tag frontend-app:latest ${{ secrets.DOCKER_HUB_USERNAME }}/frontend-app:latest
          docker push ${{ secrets.DOCKER_HUB_USERNAME }}/frontend-app:latest


