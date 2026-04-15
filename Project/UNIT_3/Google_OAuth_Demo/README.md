# Google OAuth Demo

A simple Node.js app that lets users log in using their Google account.

---

## What this project does

- Shows a home page with a **Login with Google** button
- Redirects user to Google for login
- After login, Google sends the user back to our app
- User can visit the **Dashboard** to see their name and email

---

## Step 1 — Install Node.js

Make sure Node.js is installed on your computer.
Download it from: https://nodejs.org

---

## Step 2 — Get Google Client ID and Client Secret

You need to create a project on Google Cloud to get these keys.

1. Go to https://console.cloud.google.com/
2. Click on **Select a project** at the top → then click **New Project**
3. Give your project a name (e.g. `OAuth Demo`) and click **Create**
4. Once created, make sure your new project is selected
5. In the left menu, go to **APIs & Services** → **OAuth consent screen**
6. Select **External** and click **Create**
7. Fill in the required fields:
   - App name: `OAuth Demo`
   - User support email: `your email`
   - Developer contact email: `your email`
   - Click **Save and Continue** through all steps
8. Now go to **APIs & Services** → **Credentials**
9. Click **+ Create Credentials** → select **OAuth 2.0 Client IDs**
10. Set Application type to **Web application**
11. Under **Authorized redirect URIs**, click **Add URI** and enter:
    ```
    http://localhost:3000/auth/google/callback
    ```
12. Click **Create**
13. A popup will show your **Client ID** and **Client Secret** — copy both

---

## Step 3 — Create the project folder

```
mkdir Google_OAuth_Demo
cd Google_OAuth_Demo
```

---

## Step 4 — Initialize the project

```
npm init -y
```

---

## Step 5 — Install required packages

```
npm install express passport passport-google-oauth20 express-session jsonwebtoken dotenv
```

---

## Step 6 — Create the .env file

Create a file named `.env` in the project folder and add:

```
SECRET=any_random_secret_string
PORT=3000
GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
```

- `SECRET` — any random string used to sign JWT tokens and sessions
- `GOOGLE_CLIENT_ID` — copied from Google Cloud Console (Step 2)
- `GOOGLE_CLIENT_SECRET` — copied from Google Cloud Console (Step 2)

---

## Step 7 — Create the .gitignore file (if upload project on github)

Create a file named `.gitignore` to make sure your secrets are never uploaded to GitHub:

```
.env
node_modules/
```

---

## Step 8 — Create index.js

Create `index.js` and add the app code. The app has these routes:

| Route | What it does |
|---|---|
| `/` | Home page with Login button |
| `/auth/google` | Redirects user to Google login |
| `/auth/google/callback` | Google sends user back here after login |
| `/dashboard` | Shows logged-in user's name and email |

---

## Step 9 — Run the app

```
node index.js
```

Open your browser and go to: http://localhost:3000

---

## How the login flow works

```
User clicks "Login with Google"
        ↓
App redirects to Google
        ↓
User selects their Google account
        ↓
Google redirects back to /auth/google/callback
        ↓
App creates a session and JWT token
        ↓
User is redirected to home page (logged in)
        ↓
User clicks "Go to Dashboard" → sees their name and email
```

---

## Project Structure

```
Google_OAuth_Demo/
├── index.js        ← main app file
├── .env            ← secret keys (never share this)
├── .gitignore      ← tells git to ignore .env and node_modules
├── package.json    ← project info and dependencies
└── README.md       ← this file
```
