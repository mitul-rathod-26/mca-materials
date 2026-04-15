# React Project - Old Way (create-react-app)

---

## What is React?

React is a JavaScript library made by Facebook.
It helps you build websites using small reusable pieces called **Components**.
Instead of writing one big HTML file, you break your page into small parts (components) and combine them.

---

## How to Create a React Project (Old Way)

Follow these steps one by one in your terminal:

**Step 1 - Install create-react-app tool globally (only once)**
```
npm install -g create-react-app
```
> This installs a tool on your computer that helps create React projects.

**Step 2 - Create a new React project**
```
create-react-app first_project
```
> This creates a new folder called `first_project` with all the files needed.

**Step 3 - Go inside the project folder**
```
cd first_project
```

**Step 4 - Start the project**
```
npm start
```
> This opens your React app in the browser at `http://localhost:3000`

---

## Project Folder Structure (Important Files Only)

After creating the project, you will see this structure:

```
first_project/
│
├── public/
│   └── index.html        <-- The only HTML file in the whole project
│
├── src/
│   ├── index.js          <-- Starting point of React (JavaScript)
│   └── App.js            <-- Main component (your page content goes here)
│
└── package.json          <-- Project info and list of dependencies
```

---

## How the Project Works (Flow)

This is the order in which files run when you open the app in browser:

```
Browser
  ↓
index.html        (public/index.html)
  ↓
index.js          (src/index.js)
  ↓
App.js            (src/App.js)
  ↓
Page is shown on screen
```

---

## File by File Explanation

### 1. `public/index.html`
- This is the **only HTML file** in the whole React project.
- You will see this important line inside it:
```html
<div id="root"></div>
```
- This `div` with id `root` is where React puts all your content.
- You don't need to touch this file most of the time.

---

### 2. `src/index.js`
- This is the **starting point** of your React app.
- It finds the `root` div from `index.html` and puts your React app inside it.
```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```
- Simple meaning: "Find the `root` div in HTML and show the `App` component inside it."

---

### 3. `src/App.js`
- This is the **main component** of your app.
- Whatever you write inside the `return()` of this file will show on the screen.
```js
function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
```
- This is where you will spend most of your time writing your page content.

---

### 4. `package.json`
- This file contains your project name, version, and list of all packages used.
- You don't edit this file manually. It updates automatically when you install packages.

---

## Simple Summary

| File | What it does |
|------|-------------|
| `index.html` | The base HTML page, has a `<div id="root">` |
| `index.js` | Connects React to that `root` div |
| `App.js` | Your main page - write your content here |
| `package.json` | Project info and installed packages list |

---

## Quick Start Commands

```
npm install -g create-react-app   --> Install the tool (only once)
create-react-app first_project    --> Create new project
cd first_project                  --> Go inside project folder
npm start                         --> Run the project in browser
```
