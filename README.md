# Full Stack Development — MCA Semester 2

This repository contains all practicals and projects covered in the Full Stack Development course (MCA Sem-2), organized unit-wise.

---

## 📁 Project Structure

---

## 🔷 UNIT 1 — HTML, CSS & JavaScript

Covers the fundamentals of web development.

| Topic | Description |
|---|---|
| HTML & CSS | Basic structure, styling, Flexbox layout |
| JavaScript | DOM manipulation, event handling |
| AJAX | Async requests using `XMLHttpRequest` |

---

## 🔷 UNIT 2 — Node.js & Express.js

### 1. Express Routes (`express_routs/`)
- Setting up an Express.js server
- Defining and handling HTTP routes (GET, POST)
- **Tech:** Node.js, Express.js

### 2. Async/Await & JSON API (`async_await_json/`)
- Building REST APIs with Express.js
- Calling APIs from browser using `fetch` and `async/await`
- Operations: Get all students, Get by ID, Add new student
- **Tech:** Node.js, Express.js

### 3. EJS Templates (`ejs_temp/`)
- Server-side rendering using EJS template engine
- Dynamic pages with data binding (`<%= %>`)
- Reusable components using `include()`
- Serving static files (CSS, images, HTML) via `public/` folder
- **Tech:** Node.js, Express.js, EJS

---

## 🔷 UNIT 3 — Advanced Node.js & Databases

### 1. Body Parser in Node.js (`Body_Parse_NodeJS/`)
- Reading data sent from HTML forms and JSON requests using `body-parser`
- Handling `x-www-form-urlencoded` (form data) and `raw JSON` formats
- Using separate parsers per route (`urlencodedParser`, `jsonParser`)
- **Tech:** Node.js, Express.js, body-parser

### 2. Cookies in Node.js (`Cookie_In_NodeJS/`)
- Setting, reading, and deleting cookies using `cookie-parser`
- Configuring cookie options: `maxAge` (expiry) and `httpOnly` (security)
- Viewing cookies in browser DevTools under the Application tab
- **Tech:** Node.js, Express.js, cookie-parser

### 3. JWT Authentication (`JWT_Auth_Demo/`)
- Implementing user Register, Login, and protected Dashboard routes
- Hashing passwords with `bcryptjs` and generating tokens with `jsonwebtoken`
- Verifying JWT tokens via `Authorization: Bearer <token>` header
- Part 1: API-only (tested with Postman) — Part 2: with browser HTML form UI
- **Tech:** Node.js, Express.js, jsonwebtoken, bcryptjs, dotenv

### 4. Google OAuth (`Google_OAuth_Demo/`)
- Implementing Google login using Passport.js (`passport-google-oauth20`)
- Setting up OAuth credentials on Google Cloud Console
- Login flow: Google redirect → callback → session + JWT → dashboard
- **Tech:** Node.js, Express.js, Passport.js, express-session, dotenv

### 5. MongoDB CRUD (`Mongo DB/Crud_Project/`)
- Connecting to MongoDB and performing full CRUD operations
- `insertOne`, `insertMany`, `findOne`, `find`, `updateOne`, `updateMany`, `deleteOne`, `deleteMany`
- Filtering documents using query operators like `$gt`, `$set`
- **Tech:** Node.js, MongoDB (native driver)

### 6. MySQL + Node.js CRUD (`Mongo DB/MYSQL_Node_CRUD/`)
- Connecting Node.js to MySQL using `mysql2` and XAMPP
- Performing INSERT (single & multiple), UPDATE, DELETE, SELECT operations
- Difference between `connection.query()` and `connection.execute()` (SQL injection protection)
- **Tech:** Node.js, MySQL2, XAMPP, phpMyAdmin

---

## 🔷 UNIT 4 — React.js

### 1. React Project — Old Way (`React_Project_Old_Way/first_project/`)
- Setting up a React project using `create-react-app`
- Understanding project structure: `index.html`, `index.js`, `App.js`
- How React mounts components into the DOM via `<div id="root">`
- **Tech:** Node.js, React, create-react-app

### 2. React Project — Vite (`React_Project_Vite/`)

#### a. First Project (`first_project/`)
- Setting up a React project using Vite (`npm create vite@latest`)
- Creating and rendering functional components (`Users.jsx`)
- **Tech:** React, Vite

#### b. State & Hooks (`state_hooks/`)
- Using `useState` hook to manage component state
- Building interactive counter components (`Counter.jsx`, `AgeCounter.jsx`)
- **Tech:** React, Vite

#### c. Components & Props (`comp_props_project/`)
- Passing data between components using props
- Building reusable `Users` component with props
- **Tech:** React, Vite

#### d. Fetch API (`fetch-api-practical/`)
- Fetching data from external API (`jsonplaceholder.typicode.com`)
- Using `.then()` in `UserList.jsx` and `async/await` in `PostList.jsx`
- **Tech:** React, Vite, Fetch API

#### e. LocalStorage, Lifting State Up & Composition (`local-storage_lifting-state-up/`)
- Persisting data using `localStorage`
- Lifting state up to share data between sibling components
- Component composition using `children` props (`Card.jsx`, `CompositionDemo.jsx`)
- **Tech:** React, Vite

### 3. Front + Backend Project (`Front_Backend_Project/`)
- Building a Node.js + Express backend that serves user data via `/users` API
- Building a React + Vite frontend that fetches and displays users using `useEffect`
- Handling CORS between frontend (port 5173) and backend (port 3000)
- **Tech:** Node.js, Express, React, Vite, CORS

---

## 🔷 UNIT 5 — App Implementation in Cloud

### 1. Docker Project (`Docker_Project/express-docker/`)
- Building a weather app with Node.js + Express + EJS that fetches real-time data from Open-Meteo API
- Writing a `Dockerfile` with `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD` instructions
- Using `docker-compose.yml` to configure and run the container with port mapping and auto-restart
- Running the app with `docker build`, `docker run`, and `docker compose up -d --build`
- **Tech:** Node.js, Express.js, EJS, Docker, Docker Compose

### 2. Kubernetes Project (`K8S_Project/Nodejs_Docker_Kubernetes_Deployment/`)
- Containerizing a Node.js + Express app with Docker and pushing the image to Docker Hub
- Creating `deployment.yaml` and `service.yaml` using `kubectl --dry-run=client -o yaml`
- Deploying, verifying, and managing pods using `kubectl apply`, `get`, `logs`, and `describe`
- **Approach 1 — Minikube:** Setting up a local Kubernetes cluster using Minikube, accessing app via `minikube service --url`
- **Approach 2 — Docker Desktop:** Enabling Kubernetes directly from Docker Desktop settings, switching context to `docker-desktop`, accessing app via `http://localhost`
- **Tech:** Node.js, Express.js, Docker, Kubernetes, Minikube, Docker Desktop, kubectl

---

## 🚀 How to Run Node.js Projects (UNIT 2)

```bash
# Go to the project folder
cd UNIT_2/ejs_temp

# Install dependencies
npm install

# Start the server
node index.js
```

---

## 🚀 How to Run Node.js Projects (UNIT 3)

```bash
# Go to the project folder (example: JWT Auth)
cd UNIT_3/JWT_Auth_Demo

# Install dependencies
npm install

# Start the server
node jwt_auth.js
```

> For MongoDB CRUD: make sure MongoDB is running locally before starting.
> For MySQL CRUD: make sure XAMPP (MySQL) is running before starting.
> For Google OAuth: add your credentials in `.env` before starting.

---

## 🚀 How to Run React Projects (UNIT 4)

```bash
# Go to any Vite project folder (example)
cd UNIT_4/React_Project_Vite/state_hooks

# Install dependencies
npm install

# Start the dev server
npm run dev
```

> For Front + Backend Project: open two terminals — one for backend (`node index.js`) and one for frontend (`npm run dev`).

---

## 🚀 How to Run Cloud Projects (UNIT 5)

### Docker Project

```bash
cd UNIT_5/Docker_Project/express-docker

# Run with Docker Compose
docker compose up -d --build

# Visit: http://localhost:8083

# Stop the container
docker compose down
```

### Kubernetes Project

**Approach 1 — Minikube**
```bash
cd UNIT_5/K8S_Project/Nodejs_Docker_Kubernetes_Deployment

# Start Minikube
minikube start

# Apply configs
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Get the app URL
minikube service node-k8s-demo-service --url
```

**Approach 2 — Docker Desktop**
```bash
# Enable Kubernetes from Docker Desktop Settings → Kubernetes → Enable Kubernetes

# Switch context to Docker Desktop
kubectl config use-context docker-desktop

# Apply configs
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Visit: http://localhost
```
