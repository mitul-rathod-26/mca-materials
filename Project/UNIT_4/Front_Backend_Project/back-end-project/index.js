const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Jeet', email: 'jeet@example.com' },
  { id: 3, name: 'Akash', email: 'akash@example.com' },
  { id: 4, name: 'Tom', email: 'tom@example.com' },
  { id: 5, name: 'Jastin', email: 'jastin@example.com' },
  { id: 6, name: 'Alice', email: 'alice@example.com' },
  { id: 7, name: 'Jeet', email: 'jeet@example.com' },
  { id: 8, name: 'Akash', email: 'akash@example.com' },
  { id: 9, name: 'Tom', email: 'tom@example.com' },
  { id: 10, name: 'Jastin', email: 'jastin@example.com' },
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
