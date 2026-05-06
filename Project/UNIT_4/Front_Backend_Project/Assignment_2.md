# Assignment 2 — Full Stack Development (Frontend + Backend)

**Subject:** Full Stack Development
**Practical:** Connect React Frontend with Node.js Backend
**Submission:** Submit both `back-end-project` and `front-end-project` folders as a ZIP file.

---

### Step 0 — Create the Main Project Folder

1. Create a main folder with your name in this format:
   ```
   YourName_Assignment-2
   ```
   **Example:** `Rohan_Assignment-2`

2. Inside `YourName_Assignment-2`, create two folders:
   ```
   YourName_Assignment-2/
   ├── back-end-project/
   └── front-end-project/
   ```
3. Open the `YourName_Assignment-2` folder in **VS Code**.

> All your work will be done inside this main folder.

---

### Step 1 — Create the Backend Project

1. Open terminal and navigate into `back-end-project` folder:
   ```
   cd YourName_Assignment-2/back-end-project
   ```
2. Run the following commands to set up the backend:
   ```
   npm init -y
   npm install express cors
   ```
3. Create a file named `index.js` inside `back-end-project`.
4. In `index.js`, set up an Express server that:
   - Uses `cors()` middleware
   - Has a `/users` GET route that returns a JSON array of **at least 5 users**
   - Each user must have these fields:
     - `id` (number, unique)
     - `name` (string)
     - `age` (number)
     - `city` (string)
     - `email` (format: `name@gmail.com`)
     - `userImage` (any image URL)
   - Runs on **port 3000**

   **Sample `users` array (add at least 10 records like this):**
   ```js
   const users = [
     {
       id: 1,
       name: "Rohan",
       age: 20,
       city: "Navsari",
       email: "rohan@gmail.com",
       userImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRohan"
     },
     // add more records...
   ];
   ```
5. Add a `start` script in `package.json`:
   ```json
   "scripts": {
     "start": "node index.js"
   }
   ```
6. Start the backend and verify it works by opening:
   ```
   http://localhost:3000/users
   ```
   > You should see the users JSON in the browser.

---

### Step 2 — Create the Frontend Project

1. Open a **new terminal** and navigate to the main folder:
   ```
   cd YourName_Assignment2
   ```
2. Run the following command to create the frontend inside it:
   ```
   npm create vite@latest front-end-project
   ```
   - Select **React**
   - Select **JavaScript**
2. Navigate into the project and install dependencies:
   ```
   cd front-end-project
   npm install
   ```

---

### Step 3 — Fetch Users from Backend in App.jsx

1. Open `src/App.jsx`.
2. Use `useState` and `useEffect` to:
   - Fetch users from `http://localhost:3000/users` when the page loads
   - Store the users in state
3. Display the users on the page (list or any format).

---

### Step 4 — Create a UserCard Component

1. Create a new file `src/UserCard.jsx`.
2. The `UserCard` component should accept a `user` prop and display:
   - User's **photo** (`userImage`)
   - **Name**
   - **Age**
   - **City**
   - **Email**
   - **ID**
3. Apply basic styling to make the card look clean and presentable.

---

### Step 5 — Use UserCard in App.jsx

1. Import `UserCard` into `App.jsx`.
2. Replace the plain list with a **grid of UserCards**.
3. Pass each user as a prop to `UserCard`.
4. Make sure each card has a unique `key` prop.

---

### Step 6 — Style the Page

1. Add a **header** at the top of the page with a title like `User Directory`.
2. Display the **total number of users** somewhere on the page.
3. Use a **gradient background** or any background color of your choice.
4. Make the card grid **responsive** (cards should adjust based on screen size).

---

### Step 7 — Run and Test the Full Project

1. Open **Terminal 1** — Start the backend:
   ```
   cd back-end-project
   npm start
   ```
2. Open **Terminal 2** — Start the frontend:
   ```
   cd front-end-project
   npm run dev
   ```

---

## Submission Checklist

Before submitting, make sure:

- Backend runs on `http://localhost:3000`
- `/users` route returns at least 10 users with all required fields
- Frontend fetches and displays users from the backend
- `UserCard` component is created in a separate file
- Each card shows: photo, name, age, city, email, ID
- Page has a header with title and user count
- No CORS errors in the browser console
- Both folders (`back-end-project` and `front-end-project`) are included in the ZIP
- **Must include a screenshot of the output in zip file**

---

## Folder Structure (Expected)

```
YourName_Assignment2/
├── back-end-project/
│   ├── index.js
│   └── package.json
│
└── front-end-project/
    ├── src/
    │   ├── App.jsx
    │   └── UserCard.jsx
    └── package.json
```

---