// Step 1: Install packages: 
//  npm install express
//  npm install cookie-parser

// Step 2: Setup/ import
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser()); // This reads cookies from requests

app.get('/', (req, res) => {
    var home = "Home Page";
    const username = req.cookies.username;

    if (!username) {
        res.send(`${home} : No cookie found`);
    }
    res.send(`${home} : Cookie found: ${username}`);
});


// Step 3: SET a cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'John', {
        maxAge: 900000,   // expires in 15 minutes
        httpOnly: true // The cookie only accessible by the web server, & cannot be accessed by JavaScript- security
    });
    res.send('Cookie has been set..!');
});


// Step 4: READ a cookie
app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username;
    if (!username) {
        res.send(`No cookie found`);
    }
    res.send(`Cookie found: ${username}`);
});

// Step 5: DELETE a cookie
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username');
    res.send('Cookie has been deleted..! 🗑️');
});

app.listen(3000, () => {
    console.log('Server is running on localhost:3000');
});
