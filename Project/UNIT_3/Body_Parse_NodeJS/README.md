# Body Parser in Node.js — Beginner's Guide

## What is Body Parser?

When you fill a form on a website and click **Submit**, the data you entered (like your name, email, etc.) is sent to the server.

But the server **cannot read that data directly**. It comes in a raw format that Node.js doesn't understand on its own.

**Body Parser** is a tool (called a package/library) that reads that raw data and converts it into a simple JavaScript object so you can use it easily like `req.body.username`.

> Think of it like a **translator** — the user sends data in a language the server doesn't understand, and body-parser translates it.

---

## What are the 2 Types of Data Formats?

When data is sent to the server, it comes in different formats:

| Format | When is it used? |
|---|---|
| `x-www-form-urlencoded` | When you submit an HTML form |
| `JSON` | When you send data using Postman or a frontend app (raw JSON) |

Body Parser has a **separate parser for each format**.

---

## Project Setup

### Step 1 — Install the required packages

```bash
npm init -y
npm install express body-parser
```

- `express` → helps us create a server and routes
- `body-parser` → helps us read the data sent by the user

---

## Code Explanation 

### Step 2 — Import the packages

```js
const express = require('express');
const bodyParser = require('body-parser');
```

- `require()` is how we bring in a package to use in our file
- We import `express` to create the server
- We import `body-parser` to read incoming data

---

### Step 3 — Create the app

```js
const app = express();
```

- This creates our Express application
- Think of `app` as our server that will listen and respond to requests

---

### Step 4 — Create the Parsers

```js
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
```

- `jsonParser` → reads data sent in **JSON format** (raw JSON in Postman)
- `urlencodedParser` → reads data sent from **HTML forms**
- `{ extended: false }` → means we are using simple/basic form data (no nested objects)

> We create these parsers separately so we can choose which route uses which parser.

---

### Step 5 — POST /login route (Form Data)

```js
app.post('/login', urlencodedParser, function (req, res) {
  res.send('Welcome, ' + req.body.username + '...!');
});
```

- `app.post('/login', ...)` → this route only listens for **POST** requests at `/login`
- `urlencodedParser` → we pass this parser here because the login form sends **form data**
- `req.body.username` → after the parser reads the data, we can access it using `req.body`
- `res.send(...)` → sends a response back to the user

**Example:**
- You send → `username=Akash` (form data)
- You get → `Welcome, Akash...!`

---

### Step 6 — POST /api/users route (JSON Data)

```js
app.post('/api/users', jsonParser, function (req, res) {
  res.status(201).json({ message: 'User created', user: req.body });
});
```

- `app.post('/api/users', ...)` → this route listens for **POST** requests at `/api/users`
- `jsonParser` → we use this because this route expects **JSON data**
- `res.status(201)` → 201 means "Created" (a standard success code for creating something)
- `res.json(...)` → sends a JSON response back

**Example:**
- You send → `{ "name": "Akash", "email": "akash@example.com" }` (raw JSON)
- You get → `{ "message": "User created", "user": { "name": "Akash", "email": "akash@example.com" } }`

---

### Step 7 — Start the Server

```js
app.listen(3000, function () {
  console.log('Server running on: http://localhost:3000');
});
```

- `app.listen(3000)` → starts the server on **port 3000**
- Once running, you will see the message in your terminal
- Without this line, the server will never start

---

## How to Run the Project

```bash
node body_parser_demo.js
```

You should see:
```
Server running on: http://localhost:3000
```

---

## How to Test Using Postman

### Test 1 — POST /login (Form Data)

| Field | Value |
|---|---|
| Method | POST |
| URL | http://localhost:3000/login |
| Body Type | x-www-form-urlencoded |
| Key | username |
| Value | Akash |

Response:
```
Welcome, Akash...!
```

---

### Test 2 — POST /api/users (JSON Data)

| Field | Value |
|---|---|
| Method | POST |
| URL | http://localhost:3000/api/users |
| Body Type | raw → JSON |

Body:
```json
{
  "name": "Akash",
  "email": "akash@example.com"
}
```

Response:
```json
{
  "message": "User created",
  "user": {
    "name": "Akash",
    "email": "akash@example.com"
  }
}
```

---

## Why does /api/users not work with x-www-form-urlencoded?

Because `/api/users` uses `jsonParser`, which **only understands JSON format**.

If you send form data to it, `req.body` will be **empty `{}`** and you will only get:
```json
{
  "message": "User created"
}
```

To fix this, you can use both parsers on the same route:
```js
app.post('/api/users', urlencodedParser, jsonParser, function (req, res) {
  res.status(201).json({ message: 'User created', user: req.body });
});
```

---

## Quick Summary

| Concept | Simple Meaning |
|---|---|
| `body-parser` | Reads and translates data sent by the user |
| `req.body` | The translated data you can use in your code |
| `jsonParser` | Reads JSON format data |
| `urlencodedParser` | Reads HTML form data |
| `app.listen(3000)` | Starts the server on port 3000 |
| `POST` request | Used to send/submit data to the server |
| `GET` request | Used to fetch/view a page (what browser does by default) |
