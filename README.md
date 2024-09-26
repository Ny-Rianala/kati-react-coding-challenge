# Onja Developers Coding challenge
Here is a coding challenge to test a junior developer's skills and see if they are able to tackle challenges that an intermediate dev can handle.

## Instructions:
Developers can use whatever technologies they are familiar with and need to start from scratch.
If you are stuck on running the app, please let us know.
Head to the instructions [here](https://docs.google.com/document/d/1Pstqo1wXu0v-ETa80WxtYkgq3ZzYiZWRV2E8UH12gHQ/edit)

## Frontend
Your frontend code should be written in a folder called `frontend`. Please add a clear instruction on how to run your code.

## Backend

Navigate to the `backend` folder.
This is a straightforward backend application designed for user registration, CRUD operations on product data, and email services using [Resend](https://resend.com). We have pre-populated some data in the local SQLite databases, which you can see in the `databases` folder and you are welcome to modify it as needed. .
However, please ensure that you leave enough data for us to test your application effectively.

### Technologies.
The backend code is written in Node.js and Express.js.

### How to run the app
1. Navigate to the `backend` folder.
1. Contact us for the .env file content
1. Install all necessary packages by running `npm install`
1. Run `npm start`
1. Start working on the frontend

### API Endpoints Usage Instructions

#### Base URL:
The base URL for the API is `http://localhost:3000` in development environmemt.

1. User Rrgistration: `/api/sign-up`

**Example:**

```
curl -X POST http://localhost:3000/api/signup -H "Content-Type: application/json" -d '{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "password": "john1234"
}'

```

1. User login: `/api/log-in`

**Example:**

```
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{
  "email": "john.smith@example.com",
  "password": "john1234"
}'

```
1. Get products: `/api/products`

**Example:**


```
curl -X GET http://localhost:3000/api/products

```

1. Create a product: `/api/products`

**Example:**

```
curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d '{
  "name": "Sample Product",
  "image_link": "http://example.com/image.jpg",
  "description": "This is a sample product.",
  "is_liked": false,
  "available_stocks": 10,
  "price": 19.99,
  "is_negotiable": true,
  "owner": {
    "name": "Rinon",
    "email": "rinon.tene@example.com",
    "phone_number": "1234567890",
    "address": "123 Main St",
    "availability": "9 AM - 5 PM"
  }
}'
```

1. Edit a single product: `/api/products/:id`

You can edit one or more properties at the same time.

**Example:**

```
curl -X PUT http://localhost:3000/api/products/1 -H "Content-Type: application/json" -d '{
  "is_liked": true,
  "available_stocks": 9
}'
```

1. Delete a single product: `/api/products/:id`

**Example:**

```
curl -X DELETE http://localhost:3000/api/products/1

```

1. Send an email: `/api/send-email`

## Notes:
You may need to fix some issues or make some tweaks to the backend for some functionality to work perfectly. For the most part, what's done there should be enough to complete the frontend work.
