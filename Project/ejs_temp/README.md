# EJS template
=> Create a folder named "ejs_temp"

=> Open the VS code terminal and run the following command: "npm init -y"
    e.g., "C:\Projects\ejs_temp> npm init -y
    => This command will create a package.json file in your project.

=> Next, install express using "npm install express"
    e.g., "C:\Projects\ejs_temp> npm install express

=> Next, install ejs using "npm install ejs"
    e.g., "C:\Projects\ejs_temp> npm install ejs

    "https://github.com/mde/ejs/wiki/Using-EJS-with-Express"

=> create folder inside your project and give the name "views"

=> Create a file inside the views folder with the .ejs extension. E.g., student_page.ejs

=> In the index.js file, use the following code: 
    res.render("student_page", { name: stdName }); 
    in 'student_page.ejs', e.g., 
        <h1>Hello, <%= name %></h1>

=> Create another file named header.ejs and add the navigation bar code inside it

=> Include the header file in student_page.ejs using include()
    e.g., in 'student_page.ejs', 
        <%- include('header') %>

# Static Files

=> Next, move to static files:

=> Create a folder named public. And inside the public folder, create three folders: pages, css, and img

=> Store your static files inside these folders.

=> Now in index.js add app.use(express.static('public')) to run these files
