Undefined:
    A variable declared but no value assigned.
    let x;

Null:
    Empty value intentionally assigned.
    let data = null;


# Object: Collection of data.

let student = {
    name: "John",
    email: "john@gmail.com",
    age: 20,
    isFollow: true,
};

console.log(student.name);
console.log(student["email"]);

# Array: Stores multiple values.

let subjects = ["Java", "Python", "RDBMS", "FSD"];
console.log(subjects);

console.log(subjects[1]);
console.log(subjects[1][0]);

# RegEx: It is actually a special type of Object. It is used to search, match, and validate text patterns

let text = "Hello John";
let pattern = /Hello/;

console.log(pattern.test(text));

# for email validation:

let email = "mitul@gmail.com";
let pattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

console.log(pattern.test(email));

# ==============================================

# functions:

function add(a, b) {
  return a + b;
}

let result = add(5, 3);
console.log(result);

# Arrow Function:
const greet = () => {
  console.log("Hello Students");
};

# =============================================

# Event Using addEventListener:

<button id="btn">Click Me</button>

document.getElementById("btn").addEventListener("click", function() {
  alert("Button Clicked!");
});



# ==========================================

<input type="text" id="name">
<button onclick="greetUser()">Submit</button>

function greetUser() {
  let userName = document.getElementById("name").value;
  alert("Hello " + userName);
}