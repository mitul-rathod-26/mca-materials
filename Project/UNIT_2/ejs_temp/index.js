const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile("views/index.html", { root: __dirname })
})

/// ejs
app.set('view engine', 'ejs');
// app.set("views", "./views");

/// redirect to student_page.ejs page
app.get('/student', (req, res) => {
    const stdName = "John";
    res.render("student_page", { name: stdName });
    // res.render("student_page", {name:'<strong>Bold Name</strong>'});

})

/// redirect to student_details.ejs page
app.get('/students', (req, res) => {
    /// show students list
    const studentsList = [
        { name: "Tom", age: 23, mark: 80, },
        { name: "Jerry", age: 25, mark: 85, },
        { name: "Oggy", age: 24, mark: 69, },
        { name: "Ben", age: 22, mark: 78, }
    ];
    res.render("student_details", { students: studentsList});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/// static files
// app.use(express.static('public'))  // public folder
