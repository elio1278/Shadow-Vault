# ShadowVault---Web-Exploitation-CTF-Challenge
A web-based challenge where players interact with a file management system. The goal is to log in, obtain a token, gain elevated privileges, upload a file, and later retrieve it to uncover a hidden flag. The challenge focuses on authentication, token manipulation, and role-based access control.

## Overview

This is a web-based Capture The Flag (CTF) challenge where players are tasked with interacting with a file management system. The goal of the challenge is to:

1. Log in and obtain a valid token.
2. Manipulate the token to gain elevated privileges.
3. Upload a file and later retrieve it to uncover a hidden flag.

The challenge focuses on aspects of **authentication**, **token manipulation**, and **role-based access control (RBAC)**. It encourages players to exploit weaknesses in the authentication flow and role management to gain unauthorized access.

## Technologies Used

- **Frontend**: HTML + CSS + JS
- **Backend**: Node.js with Express.js for handling API routes.
- **Database**: MongoDB for storing user data and uploaded files.
- **Authentication**: JSON Web Tokens (JWT) for handling user sessions and role-based access control.
- **Hosting**: Vercel (for the frontend).

## Challenge Flow

1. **Login**: 
   - The player logs in using a set of credentials. Upon successful login, a JWT token is issued, which is used for accessing different endpoints of the application.
   
2. **Token Manipulation**:
   - The player can try to manipulate the JWT token to change their role. This would grant them elevated privileges to upload files and access sensitive data.
   
3. **File Upload**:
   - As an admin, the player can upload a file, which is then stored in the backend system.

4. **File Retrieval**:
   - The player must then retrieve the uploaded file.
   - The hidden flag is contained within the file's data, which they must access to complete the challenge.

## Challenge Instructions

1. **Setup**:
   - Clone the repository:
     ```bash
     git clone https://github.com/elio1278/ShadowVault---Web-Exploitation-CTF-Challenge.git
     cd ShadowVault---Web-Exploitation-CTF-Challenge
     ```

2. **Environment Setup**:
   - Install dependencies:
     ```bash
     npm install
     ```

3. **Environment Variables**:
   - Set up the required environment variables:
     - `MONGODB_URI`: Your MongoDB connection string.
     - `JWT_SECRET`: A secret key for JWT signing.

4. **Running Locally**:
   - To run the application locally for development:
     ```bash
     npm start
     ```

   - This will start the frontend and backend locally. You can access the frontend at `http://localhost:5000`.

5. **Deploying to Vercel**:
   - Push your code to GitHub or GitLab.
   - Connect your repository to Vercel for deployment.
   - Vercel will automatically detect and deploy the project.

6. **Testing the Challenge**:
   - Once the challenge is deployed, follow the instructions on the frontend to:
     - Log in with the credentials provided.
     - Inspect the issued token and attempt to manipulate it.
     - Upload a file and retrieve it to uncover the hidden flag.

## Setting Up Locally to Play the Challenge

If you want to play the challenge locally instead of deploying it, follow these steps:

1. **Ensure you have MongoDB running locally**:
   - If you don’t have MongoDB installed, download and install it from [MongoDB's official site](https://www.mongodb.com/try/download/community).
   - Start MongoDB using the command:
     ```bash
     mongod --dbpath /path/to/your/database
     ```

2. **Run the backend**:
   - Navigate to the project folder and run:
     ```bash
     npm run server
     ```

   - This will start the backend at `http://localhost:5000`.

3. **Run the frontend**:
   - Open another terminal and navigate to the frontend folder (if applicable):
     ```bash
     cd client
     npm start
     ```

   - This will start the frontend at `http://localhost:3000`.

4. **Play the challenge**:
   - Open `http://localhost:3000` in your browser and attempt to complete the challenge by logging in, tampering with JWTs, uploading files, and retrieving them to find the hidden flag.

## Key Concepts Covered

- **Authentication**: Understanding the flow of JWT-based authentication, token issuance, and manipulation.
- **Role-based Access Control (RBAC)**: Exploiting weaknesses in role management to escalate privileges and access sensitive data.
- **File Management**: Interacting with a file management system to upload and retrieve files.
- **Base64 Encoding**: Understanding the use of Base64 encoding for encoding file IDs and decoding them before accessing files.

---

## Authors

- **Shashwath Prabhu** – [GitHub Profile](https://github.com/shashwath1278)
