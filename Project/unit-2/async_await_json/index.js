const express = require('express');
const app = express();
app.use(express.json()); // parse body using middelware
app.use(express.static(__dirname)); // serve HTML

const students = [
  { id:1, name:'Jeel', cgpa:8.75 },
  { id:2, name:'Ravi',  cgpa:7.90 },
];

// GET all students
app.get('/api/students', (req,res) => {
  res.json(students);
});

// GET one student by ID
app.get('/api/students/:id', (req,res) => {
  const s = students.find(
    s => s.id === +req.params.id); // use + to convert req into a number before comparing. e.g., "1" => 1.
  s ? res.json(s)
    : res.status(404).json(
        { error:'Not found' });
});

// POST — add a new student

//When someone sends a POST request to /api/students, run this function.
app.post('/api/students',(req,res)=>{
  const s = req.body;  // req.body contains data sent by the client.
  s.id = students.length + 1; // add id, like if two students exist, third student's id will be 2+1=3.
  students.push(s); // push() adds a new element to the end of the array.
  res.status(201).json(s);
});


app.listen(3000, () => {
    console.log('localhost:3000 is running');
})
