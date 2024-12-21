# Assignment 3

This project is a backend application built with TypeScript and Node.js. It provides a set of APIs for user authentication, blog management, and admin actions. The project uses MongoDB as its database and includes linting and formatting tools for maintaining code quality.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Blog Management](#blog-management)
  - [Admin Actions](#admin-actions)
- [Development](#development)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shipon-hossen-raju/L2-A3-writer.git
   cd L2-A3-writer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=<your-mongo-db-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Start the server:
   - For production:
     ```bash
     npm run start:prod
     ```
   - For development:
     ```bash
     npm run start:dev
     ```

## Scripts

The following scripts are available in the `package.json` file:

- **`build`**: Compiles the TypeScript code to JavaScript.
- **`start:prod`**: Starts the production server.
- **`start:dev`**: Starts the development server with hot reload using `ts-node-dev`.
- **`lint`**: Runs ESLint to check for linting errors.
- **`lint:fix`**: Fixes linting issues automatically.
- **`prettier`**: Formats the code in the `src` directory.
- **`prettier:fix`**: Fixes formatting issues in the `src` directory.

## API Endpoints

### Authentication

1. **Register User**

   - **Endpoint**: `POST /api/auth/register`
   - **Description**: Registers a new user.

2. **Login User**
   - **Endpoint**: `POST /api/auth/login`
   - **Description**: Logs in an existing user.

### Blog Management

1. **Create Blog**

   - **Endpoint**: `POST /api/blogs`
   - **Description**: Creates a new blog post.

2. **Update Blog**

   - **Endpoint**: `PATCH /api/blogs/:id`
   - **Description**: Updates an existing blog post by ID.

3. **Delete Blog**

   - **Endpoint**: `DELETE /api/blogs/:id`
   - **Description**: Deletes a blog post by ID.

4. **Get All Blogs**
   - **Endpoint**: `GET /api/blogs`
   - **Description**: Retrieves all public blogs.

### Admin Actions

1. **Block User**

   - **Endpoint**: `PATCH /api/admin/users/:userId/block`
   - **Description**: Blocks a user by ID.

2. **Delete Blog**
   - **Endpoint**: `DELETE /api/admin/blogs/:id`
   - **Description**: Deletes a blog post by ID as an admin.

## Development

- Use `npm run start:dev` to run the development server with live reload.
- Ensure code quality with `npm run lint` and `npm run prettier` before pushing changes.

## Dependencies

- **bcrypt**: For hashing passwords.
- **cors**: For enabling cross-origin requests.
- **dotenv**: For environment variable management.
- **express**: Web framework for building APIs.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens.
- **mongoose**: For interacting with MongoDB.
- **zod**: For schema validation.

## Dev Dependencies

- **@eslint/js**: Core ESLint library.
- **@types/bcrypt**: TypeScript types for bcrypt.
- **@types/express**: TypeScript types for Express.
- **@types/jsonwebtoken**: TypeScript types for jsonwebtoken.
- **@types/node**: TypeScript types for Node.js.
- **@typescript-eslint/eslint-plugin**: ESLint plugin for TypeScript.
- **@typescript-eslint/parser**: TypeScript parser for ESLint.
- **eslint**: For linting JavaScript and TypeScript code.
- **nodemon**: For automatically restarting the server during development.
- **prettier**: For code formatting.
- **ts-node-dev**: For running TypeScript code with live reload.
- **typescript**: For compiling TypeScript to JavaScript.
