# spectrum-backend
Spectrum Diagnostics Backend
Overview
This is the backend server for the Spectrum Diagnostics Laboratory & Research Center application, built with Node.js, Express, and MongoDB. It provides RESTful APIs for user authentication, job order management, and user administration. The backend is designed to integrate with a React frontend and follows a modular structure with controllers, routes, and middleware.
Prerequisites

Node.js (v16 or higher)
npm (comes with Node.js)
MongoDB (local instance or MongoDB Atlas)
Environment variables configured

Installation
1. Clone the Repository
### `git clone <repository-url>`

2. Checkout in development branch
### `git checkout development`

3. Install Dependencies
### `npm install`

4. Configure Environment Variables
Create a .env file in the root directory with the following variables:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/spectrum
JWT_SECRET=supersecretjwtkey

The server will run on http://localhost:5000 by default.
5. Start the Server
### `npm run start`