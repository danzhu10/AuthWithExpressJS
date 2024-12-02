# Authentication API

This repository contains a simple authentication API built with Node.js, Prisma, and MySQL. It includes endpoints for user registration, login, password change, email verification, and profile.

---

## Features

- **User Registration**: Create a new account with email and password.
- **User Login**: Authenticate users and return a JSON Web Token (JWT).
- **Email Verification**: Send a verification via email.
- **Change Password**: Update user password securely.
- **Get Profile**: Fetch user profile data.

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MySQL](https://www.mysql.com/) (v5.7 or later)
- [Prisma CLI](https://www.prisma.io/docs/getting-started)

---

## Getting Started

Follow these steps to set up and run the Authentication API locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/authentication-api.git
cd authentication-api
```

### 2. Install Dependencies

```bash
git clone https://github.com/your-username/authentication-api.git
cd authentication-api
```

### 3. Configure Environment Variables

```bash
SERVER_HOST=http://localhost:3000
SERVER_PORT=3000
JWT_TOKEN_EXPIRED=30d
JWT_SECRET=iniSecretAjay29203PPxSdkO09DFF88x
USER_EMAIL=
USER_PASS=
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
```
Replace SERVER_HOST, SERVER_PORT, DATABASE_URL with your MySQL credentials.
Set JWT_SECRET to a strong, random string.
Configure USER_EMAIL and USER_PASS with your email provider details for sending verifications.

### 4. Initialize Prisma

```bash
npx prisma generate
```

### 5. Start the Application 

```bash
node app.js
```
