# API Documentation

Welcome to the API documentation for the *`Marhaba Delivery Service`* project. This document provides a comprehensive guide to the API endpoints and how to interact with them. Please follow the guidelines below to make the most of this documentation.

## Base URL

The base URL for all API endpoints is: `http://localhost:3000` (or the URL you specified during installation).

## Authentication

This API requires user authentication via JSON Web Tokens (JWT). To access protected routes, include the JWT token in the `Authorization` header as follows:

## Routes :

#### ***Authentication :***

| Method | Endpoint                         | Description                                                              | Request Body                                                                                                                   | Response                                                                               | Access Control             |
| ------ | -------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------- |
| POST   | `/api/auth/register`             | Register a new user (Client or Livreur)                                  | - `name`: User's name<br>- `email`: User's email<br>- `password`: User's password<br>- `role`: User's role (Client or Livreur) | - `id`: User ID<br>- `name`: User name<br>- `email`: User email<br>- `role`: User role | ***Public***               |
| POST   | `/api/auth/login`                | Log in with a registered user's email and password to obtain a JWT token | - `email`: User's email<br>- `password`: User's password                                                                       | JWT token                                                                              | ***Public***               |
| POST   | `/api/auth/forgetpassword`       | Request a password reset for a registered user                           | - `email`: User's email                                                                                                        | Confirmation message                                                                   | ***Public***               |
| PUT    | `/api/auth/resetpassword/:token` | Reset a user's password after receiving a reset token via email          | Request Parameters:<br>- `token`: Reset token received via email<br>Request Body:<br>- `password`: New password                | Confirmation message                                                                   | ***Public***               |
| GET    | `/api/user/:role/me`             | Get the authenticated user's profile based on their role                 | - User profile information                                                                                                     | User profile information                                                               | ***Private (Role-Based)*** |
| POST   | `/api/auth/logout`               | Log out the current authenticated user                                   | - None                                                                                                                         | Logout confirmation message                                                            | ***Private***              |

---
---

#### ***Users :***

| Method | Endpoint                     | Description                       | Request Body           | Response                         | Access Control |
| ------ | ---------------------------- | --------------------------------- | ---------------------- | -------------------------------- | -------------- |
| GET    | `/api/users`                 | Get all registered users          | - None                 | - List of user profiles          | ***Private***  |
| GET    | `/api/users/:id`             | Get specific user by ID           | - None                 | - User profile by ID             | ***Private***  |
| POST   | `/api/users`                 | Add new user                      | - User details         | - Created user profile           | ***Admin***    |
| PUT    | `/api/users/:id/update`      | Update profile information        | - Updated user details | - Updated user profile           | ***Private***  |
| DELETE | `/api/users/:id/delete`      | Delete account                    | - None                 | - Deletion confirmation message  | ***Private***  |
| PATCH  | `/api/users/:id/assign_role` | Assign role to an existing user   | - Role details         | - Updated user profile with role | ***Admin***    |
| PATCH  | `/api/users/:id/revoke_role` | Revoke role from an existing user | - None                 | - Updated user profile           | ***Admin***    |

---
---

#### ***Roles :***

| Method | Endpoint                | Description                   | Request Body           | Response                        | Access Control |
| ------ | ----------------------- | ----------------------------- | ---------------------- | ------------------------------- | -------------- |
| GET    | `/api/roles`            | Get all roles                 | - None                 | - List of roles                 | ***Private***  |
| GET    | `/api/roles/:id`        | Get specific role by ID       | - None                 | - Role details by ID            | ***Private***  |
| POST   | `/api/roles`            | Add new role                  | - Role details         | - Created role details          | ***Admin***    |
| PATCH  | `/api/roles/:id/edit`   | Edit name of an existing role | - Updated role details | - Updated role details          | ***Admin***    |
| DELETE | `/api/roles/:id/remove` | Remove an existing role       | - None                 | - Deletion confirmation message | ***Admin***    |

<!-- #### Orders

| Method | Endpoint                     | Description                           | Access Control |
| ------ | ---------------------------- | ------------------------------------- | -------------- |
| GET    | /api/orders                  | Get all orders                        | Private        |
| GET    | /api/orders/:orderId         | Get order by ID                       | Private        |
| POST   | /api/orders                  | Place a new order                     | Customer       |
| PATCH  | /api/orders/:orderId/cancel  | Cancel an active order                | Customer       |
| PATCH  | /api/orders/:orderId/deliver | Mark an order as delivered            | Driver         |
| PATCH  | /api/orders/:orderId/pickup  | Pick up and mark an order as on route | Driver         | --> |

## Error Handling

- This API handles errors and provides appropriate error messages in JSON format. Please refer to the API documentation for specific error responses for each endpoint.

## Testing

- For testing purposes, you can use the provided test cases and use tools like Postman or cURL to interact with the API endpoints.

<br>

> For any questions or issues related to this API, please [contact the project maintainers](mailto:yhammani.student@gmail.com).
