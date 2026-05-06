# Express Weather App — Docker Project

A simple weather app built with **Node.js + Express + EJS** that fetches real-time weather data for Navsari, India using the [Open-Meteo API](https://open-meteo.com/), containerized with Docker.

---

## Project Structure

```
express-docker/
├── views/
│   └── weather.ejs       # EJS template for the weather UI
├── Dockerfile            # Docker image instructions
├── docker-compose.yml    # Docker Compose configuration
├── package.json          # Node.js dependencies
└── server.js             # Express server + API logic
```

---

## Step 1 — 

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## Step 2 — Create the Project

```bash
mkdir express-docker
cd express-docker
npm init -y
```

Set `"type": "module"` in `package.json` to use ES module syntax (`import`/`export`).

---

## Step 3 — Install Dependencies

```bash
npm install express ejs
```

- `express` — web framework to handle routes and responses
- `ejs` — templating engine to render dynamic HTML

---

## Step 4 — Create the Server (`server.js`)

The server does the following:

1. Sets up an Express app with EJS as the view engine
2. On `GET /`, fetches current weather from Open-Meteo API using `fetch()`
3. Passes temperature, humidity, wind speed, and weather condition to the EJS template
4. Renders the weather card UI

---

## Step 5 — Create the View (`views/weather.ejs`)

An EJS template that receives variables from the server (`temperature`, `humidity`, `wind`, `condition`, `location`, `updated_at`) and renders a styled weather card.

---

## Step 6 — Run Locally (Without Docker)

```bash
node server.js
```

Visit `http://localhost:5000` in your browser.

---

## Step 7 — Dockerize the App

### The `Dockerfile` — explained line by line

```dockerfile
FROM node:24-alpine
```
Uses the official Node.js 24 image based on Alpine Linux (a minimal ~5MB Linux distro), keeping the image size small.

```dockerfile
WORKDIR /expressdocker
```
Sets the working directory inside the container. All subsequent commands run from this path. If it doesn't exist, Docker creates it automatically.

```dockerfile
COPY package*.json .
```
Copies `package.json` and `package-lock.json` into the container **before** copying the rest of the code. This is done first so Docker can cache the `npm install` layer — if your code changes but dependencies don't, Docker skips reinstalling packages.

```dockerfile
RUN npm install
```
Installs all dependencies listed in `package.json` inside the container.

```dockerfile
COPY . .
```
Copies the rest of your project files (server.js, views/, etc.) into the container's working directory.

```dockerfile
EXPOSE 5000
```
Documents that the container listens on port 5000. This is informational — it doesn't actually publish the port. You still need `-p` when running.

```dockerfile
CMD ["node", "server.js"]
```
The default command that runs when the container starts. Starts the Express server.

---

### The `docker-compose.yml` — explained

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - "8083:5000"
```

- `services` — defines all containers that make up the app
- `app` — the name of this service (can be anything)
- `build.context: .` — tells Docker Compose to look for the Dockerfile in the current directory
- `build.dockerfile: Dockerfile` — explicitly names the Dockerfile to use
- `restart: unless-stopped` — automatically restarts the container if it crashes, unless you manually stop it
- `ports: "8083:5000"` — maps port **8083 on your machine** to port **5000 inside the container** (format: `host:container`)

---

## Step 8 — Docker Commands

### Build the image manually

```bash
docker build -t expressweather .
```

- `docker build` — builds a Docker image from the Dockerfile
- `-t expressweather` — tags (names) the image as `expressweather` so you can reference it easily
- `.` — the build context is the current directory (where the Dockerfile is)

---

### Run the container manually

```bash
docker run -t --rm -p 8081:5000 expressweather
```

- `docker run` — creates and starts a container from the image
- `-t` — attaches a pseudo-terminal so you can see logs in the terminal
- `--rm` — automatically removes the container when it stops (keeps things clean, no leftover containers)
- `-p 8081:5000` — maps port **8081 on your machine** to port **5000 inside the container**
- `expressweather` — the name of the image to run

Visit `http://localhost:8081` to see the app.

---

### Run with Docker Compose

```bash
docker compose up -d --build
```

- `docker compose up` — starts all services defined in `docker-compose.yml`
- `-d` — detached mode, runs containers in the background (you get your terminal back)
- `--build` — forces Docker to rebuild the image before starting (picks up any code changes)

Visit `http://localhost:8083` to see the app.

To stop the running containers:

```bash
docker compose down
```

---

## API Used

[Open-Meteo](https://open-meteo.com/) — free, no API key required.

Parameters fetched: `temperature_2m`, `relative_humidity_2m`, `wind_speed_10m`, `weathercode`
