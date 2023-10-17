<!-- # marhaba-delivery-service
This repository houses the backend code for the "*Marhaba Delivery App,*" a robust and secure Single Page Application
(SPA) designed for a restaurant's home delivery service. The application is built on Express.js and incorporates JWT
(JSON Web Token) authentication to ensure data security and user role management. -->

# Marhaba Delivery Service - ExpressJS JWT Backend

[![GitHub
license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/youssefhammani/marhaba-delivery-service/blob/main/LICENSE)

## Description

Welcome to the backend repository of the "*Marhaba Delivery App,*" project, focusing on (JSON Web Token) JWT authentication and built with
ExpressJS. This project aims to develop a comprehensive Single Page Application (SPA) with Client Side Rendering (CSR)
for the Marhaba restaurant's home delivery service. The application includes features for both restaurant managers,
clients, and delivery personnel.

## Table of Contents

- [Key Features](#key-features)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Usage](#usage)
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

## API Documentation

For detailed information on the API endpoints and how to use them, please refer to our [API Documentation](api-docs.md).

## Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/youssefhammani/marhaba-delivery-service.git

## Usage

Explain how to use your project and include examples if applicable.

## Contributing

Please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md) to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- GitHub: [github.com/youssefhammani](https://github.com/youssefhammani)
- Email: yhammani.student@gmail.com
