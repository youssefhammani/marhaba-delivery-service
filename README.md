<!-- # marhaba-delivery-service
This repository houses the backend code for the "*Marhaba Delivery App,*" a robust and secure Single Page Application
(SPA) designed for a restaurant's home delivery service. The application is built on Express.js and incorporates JWT
(JSON Web Token) authentication to ensure data security and user role management. -->

# Marhaba Delivery Service - ExpressJS JWT Backend

[![GitHub
license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/youssefhammani/marhaba-delivery-service/blob/main/LICENSE)

## Description

Welcome to the backend repository of the "*Marhaba Delivery App,*" project, focusing on (JSON Web Token) JWT
authentication and built with
ExpressJS. This project aims to develop a comprehensive Single Page Application (SPA) with Client Side Rendering (CSR)
for the Marhaba restaurant's home delivery service. The application includes features for both restaurant managers,
clients, and delivery personnel.

## Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Script Documentation](#script-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Key Features

- JWT Authentication: Ensures secure access and data protection.
- Comprehensive Role Management: Tailored user roles for different stakeholders.
- Single Page Application: Enhances performance and provides a seamless user experience.
- Client Side Rendering: Improves speed and responsiveness.
- API Documentation: Detailed documentation for developers.

#### For the Manager:

- Web Admin Portal: Manage incoming orders, driver assignments, and view statistics.
- Announcements: Create, modify, and delete meal announcements.
- User Management: Administer client and driver information and ban accounts.

#### For the Client:

- User Registration: Clients can register directly through the application.
- Order Meals: Place orders for available meals.
- Delivery Location: Specify pickup and drop-off locations.
- Cash Payment: Automatic payment deduction upon delivery completion with email invoices.
- Order History: Track delivery history within the application.

#### For the Driver:

- Driver Registration: Delivery personnel can register through the mobile app, pending administrator approval.
- Status Updates: Drivers can update the client on order status, such as acceptance, order pickup, and order delivery.
- Delivery History: Track delivery history and monitor the status of each delivery, including canceled deliveries.

#### Backend Stack:

- NodeJS (ExpressJs)
- MongoDB (Non-relational NoSQL database)

### User Authentication Routes:

- `api/auth/login`
- `api/auth/register`
- `api/auth/forgetpassword`
- `api/auth/resetpassword/:token`

Once a user is authenticated, they will be redirected to a user profile route, displaying their role as follows:

- Route: `api/user/livreur/me` - Message: "Bonjour Anass, votre rôle est : livreur"
- Route: `api/user/manager/me` - Message: "Bonjour Riad, votre rôle est : Manager"
- Route: `api/user/client/me` - Message: "Bonjour Omaima, votre rôle est : Client"

### Unit Testing for Authentication

To ensure the robustness and reliability of our application, we need to implement unit tests for authentication. Here
are the test cases:

#### Registration (api/auth/register):

- Positive Test: Ensure a user can register with all required details, and the database reflects this new entry.
- Negative Test: Attempt to register with an existing email address; the application should return an error indicating
that the email is already registered.
- Negative Test: Try to register with incomplete information (e.g., without providing a password); the application
should return an appropriate error.

#### Login (api/auth/login):

- Positive Test: Try to log in with a valid email and password; the application should return a valid JWT token.
- Negative Test: Attempt to log in with an incorrect password; the application should return an authentication error.
- Negative Test: Try to log in with an unregistered email; the application should return an appropriate error.

### Required Libraries

- Bcryptjs
- Dotenv
- Express
- Jsonwebtoken
- Mongoose
- Nodemailer
- Nodemon
- Jest or Mocha (for testing)

## Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/youssefhammani/marhaba-delivery-service.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo-name
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   - Create a `.env` file in the root of the project and add the required environment variables.
   - Fill it with necessary credentials for database connection, mail server configuration, etc.
   - For example:

      ```env
      PORT=3000
      MONGODB_URI=mongodb://localhost:27017/your-database-name
      JWT_SECRET=your-secret-key
      ```
   
   - Make sure to replace the values with your specific configuration.

5. **Start the development server:**

   ```bash
   npm start
   ```

6. **Open Postman For Professional API Testing:**

   - Utilize [Postman](https://www.postman.com/) or a similar tool for professional API testing and interaction with the documented endpoints. [Click here](documents/api-docs.md) to access the documentation.

## Usage

- To use this project and its API, follow these steps:

1. **User Registration:**

   - Clients can register directly via the application. Use the api/auth/register route to register with your details.

2. **User Authentication:***

   - Log in using the api/auth/login route with your registered email and password to obtain a JWT token.

3. **API Routes:**

   - Access the various API routes for creating orders, managing user roles, and other functionalities as described in the project's documentation.

4. **Testing:**

   - For testing purposes, you can use the provided test cases for user registration and authentication to ensure the application's robustness.

* Please refer to the project's documentation for detailed information on how to use each API route and feature.

> For any questions or issues, don't hesitate to reach out to the project maintainers. You can click [here](mailto:yhammani.student@gmail.com) to contact me through Gmail.

## Testing

- The app uses Jest as its testing framework. To run tests, simply type: 

   ```bash
   npm test
   ```

## API Documentation

For detailed information on the API endpoints and how to use them, please refer to our [API Documentation](documents/api-docs.md).

## Script Documentation

For detailed information on the scripts and how to use them, please refer to the [SCRIPT Documentation](documents/Script_Guide.md).

## Contributing

Please follow the guidelines in [CONTRIBUTING.md](documents/CONTRIBUTING.md) to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](documents/LICENSE) file for details.

## Contact

- GitHub: [github.com/youssefhammani](https://github.com/youssefhammani)
- Email: yhammani.student@gmail.com
