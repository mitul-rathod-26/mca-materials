const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// GET /login shows the HTML form
// app.get('/login', function (req, res) {
//   res.send(`
//     <form method="POST" action="/api/users">
//       <input type="text" name="username" placeholder="Enter username" />
//       <button type="submit">Login</button>
//     </form>
//   `);
// });

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('Welcome, ' + req.body.username + '...!');
});

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  res.status(201).json({ message: 'User created', user: req.body });
});

// If you want `/api/users` to accept both formats, update the route to use both parsers:
// app.post('/api/users', urlencodedParser, jsonParser, function (req, res) {
//   res.status(201).json({ message: 'User created', user: req.body });
// });

app.listen(3000, function () {
  console.log('Server running on: http://localhost:3000');
});
