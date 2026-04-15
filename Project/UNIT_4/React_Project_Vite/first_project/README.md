# First React Project (with Vite)

This is first React project created using **Vite** — a fast and modern tool to build React apps.

---

## What is React?

React is a JavaScript library used to build **user interfaces** (what you see on a website).
Instead of writing plain HTML, in React you write small reusable pieces called **Components**.

## What is Vite?

Vite is a tool that helps you **create, run, and build** React projects very fast.
It replaces the older `create-react-app` tool and is much faster.

---

## How to Create This Project (Step by Step)

### Step 1 — Make sure Node.js is installed
Before anything, you need Node.js on your computer.
Check by running this in your terminal:
```
node -v
```
If you see a version number like `v20.x.x`, you are good to go.
If not, download it from https://nodejs.org

---

### Step 2 — Create the React app using Vite
Open your terminal, go to the folder where you want to create the project, and run:
```
npm create vite@latest
```
It will ask you a few questions:
- **Project name** → type your project name (e.g. `first_project`)
- **Framework** → select `React`
- **Variant** → select `JavaScript`

---

### Step 3 — Go inside the project folder
```
cd first_project
```

---

### Step 4 — Install all required packages
```
npm install
```
This downloads all the libraries your project needs (stored in the `node_modules` folder).

---

### Step 5 — Start the development server (Run the project)
```
npm run dev
```
After running this, open your browser and go to:
```
http://localhost:5173
```
You will see your React app running live!

---


## Project Structure (Which File Does What)

```
first_project/
│
├── public/                  → Static files served directly (not processed by React)
│   ├── favicon.svg          → The small icon shown on the browser tab
│   └── icons.svg            → Other static icons
│
├── src/                     → Main source code of your React app (you work here mostly)
│   ├── assets/              → Images, SVGs, and other media files used in your app
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── App.jsx              → The main component of your app (your homepage basically)
│   ├── App.css              → CSS styles specifically for App.jsx
│   ├── index.css            → Global CSS styles applied to the whole app
│   └── main.jsx             → The ENTRY POINT — this is where React starts (explained below)
│
├── index.html               → The one and only HTML file — React injects itself here
├── package.json             → Lists your project name, scripts, and all dependencies
├── package-lock.json        → Auto-generated file that locks exact versions of packages
├── vite.config.js           → Configuration file for Vite (settings for how app is built)
├── eslint.config.js         → ESLint rules to help you write clean, error-free code
└── .gitignore               → Tells Git which files/folders to NOT track (e.g. node_modules)
```

---

## Which File Runs First? (Execution Order)

When you run `npm run dev` and open the browser, here is what happens step by step:

```
1. index.html         ← Browser loads this first (it's the only HTML file)
        |
        ↓
2. main.jsx           ← index.html loads this JS file (it's the entry point of React)
        |
        ↓
3. App.jsx            ← main.jsx imports and renders the App component
        |
        ↓
4. index.css          ← Global styles are applied
   App.css            ← App-specific styles are applied
        |
        ↓
5. Browser shows your React app!
```

### Simple Explanation:

- `index.html` has a `<div id="root"></div>` — this is an empty box where React puts everything.
- `main.jsx` tells React: *"Hey, take the App component and put it inside that empty div."*
- `App.jsx` is where you actually write what the user sees on the screen.

---

## Key Commands Summary

| Command           | What it does                              |
|-------------------|-------------------------------------------|
| `npm install`     | Install all packages/dependencies         |
| `npm run dev`     | Start the app locally for development     |
| `npm run build`   | Build the app for production              |
| `npm run preview` | Preview the production build locally      |

---

## Tips 

- You will spend most of your time inside the `src/` folder.
- `App.jsx` is your starting point — edit this file to change what appears on screen.
- Every `.jsx` file is a **React Component** — think of it as a custom HTML block.
- After saving any file, the browser **automatically refreshes** — this is called **HMR (Hot Module Replacement)**.
- Never manually edit `package-lock.json` — it is auto-managed.
- The `node_modules/` folder is huge and auto-generated — never push it to GitHub (it's already in `.gitignore`).
