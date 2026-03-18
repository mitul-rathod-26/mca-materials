/*
Node.js is the runtime environment that allows you to build a server, 
while Express.js is a framework that makes writing the server code easier, more organized, and manageable.
*/

// first express code
const express = require('express');
const app = express();

app.use((req, res, next) => {
console.log('Middleware executed!');
next(); // Pass control to the next handler
});

// Basic GET route
app.get('/', (req, res) => {
res.send('Hello World!');
});

app.get('/profile', (req, res) => {
res.send('User Profile!');
});

app.get('/exFile', (req, res) => {
  res.sendFile(__dirname + '/express_demo.html');
});


app.listen(3000, () => {
console.log('Server is running on localhost:3000');
});


// =============================================

// Middleware

/*
Middleware functions are executed before the route handlers. 
They have access to the request (req) and response (res) objects.
*/

// Simple logger middleware and it should be written before the route



// =============================================

// Dynamic Routing 
/*
Use route parameters to handle dynamic data in the URL (e.g., user profiles).
*/


// Dynamic route parameter
app.get('/profile/:username', (req, res) => {
res.send(`Hello from profile: ${req.params.username}`); // here used (`) Backtick
});

/*
req.params = {
  username: "john"
}
*/