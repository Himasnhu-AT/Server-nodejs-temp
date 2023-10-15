## Authentication API Documentation

### User Model

The User model represents the user data in your application.


**Fields:**

- `name` (String): The user's name.
- `email` (String): The user's email address.
- `password` (String): The user's hashed password.
- `type` (String): User type (default is "user").
- `contact` (String): Contact information.
- `address` (String): User's address.


### Endpoints


#### 1. Sign Up

**Route**: `POST /api/signup`

**Description**: Allows a user to register by providing a name, email, and password. The password is hashed before storing in the database.

**Request Body**:
- `name` (String): User's name.
- `email` (String): User's email.
- `password` (String): User's password.

**Response**:
- `user` (Object): The registered user's data.


#### 2. Sign In

**Route**: `POST /api/signin`

**Description**: Allows a registered user to sign in by providing their email and password. Generates a JSON Web Token (JWT) for authentication.

**Request Body**:
- `email` (String): User's email.
- `password` (String): User's password.

**Response**:
- `token` (String): JWT for user authentication.
- `user` (Object): The user's data.


#### 3. Token Validation

**Route**: `POST /tokenIsValid`

**Description**: Validates a user's token and returns whether it is valid or not.

**Request Headers**:
- `x-auth-token` (String): User's JWT token.

**Response**:
- `valid` (Boolean): `true` if the token is valid, `false` if not.
- `user` (Object): The user's data (if valid).


#### 4. Update User Data

**Route**: `POST /update`

**Description**: Allows a user to update their contact, address, and email. Requires a valid JWT token for authentication.

**Request Headers**:
- `x-auth-token` (String): User's JWT token.

**Request Body**:
- `contact` (String): Updated contact information.
- `address` (String): Updated address.
- `email` (String): Updated email.

**Response**:
- `msg` (String): Message indicating the update status.
- `user` (Object): The updated user data.


#### 5. Get User Data

**Route**: `GET /`

**Description**: Fetches the user's data along with their JWT token for authentication.

**Request Headers**:
- `x-auth-token` (String): User's JWT token.

**Response**:
- `user` (Object): The user's data.
- `token` (String): JWT for user authentication.


### Middleware

#### Authentication Middleware

**Description**: Middleware to verify user authentication by checking the JWT token.

**Usage**: Add this middleware to routes that require authentication.

**Request Headers**:
- `x-auth-token` (String): User's JWT token.

**Response**:
- If authentication fails, it returns a `401 Unauthorized` response.
- If authentication succeeds, it sets `req.user` with the user's ID and `req.token` with the JWT for further use.

This documentation provides an overview of the available routes, their purposes, and the model and middleware used in your authentication system.