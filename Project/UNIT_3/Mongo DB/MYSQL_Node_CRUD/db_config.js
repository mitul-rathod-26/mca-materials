// Load mysql2 package
const mysql = require('mysql2');

// Connect to MySQL (no database selected yet)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

// Start the connection
connection.connect(function(err) {
  err ?
    hasError(err, 'Connection Error') :
    (console.log('✅ Connected to MySQL..!'), createDatabase());
});

// Step 1: Create the database
function createDatabase() {
  connection.execute('CREATE DATABASE IF NOT EXISTS students_db', function(err) {
    err ?
      hasError(err, 'Error creating database') :
      (console.log('✅ Database "students_db" created!'), createTable());
  });
}

// Step 2: Create the table inside the database
function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS students_db.tbl_student (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(100),
    email VARCHAR(100)
  )`;
  connection.execute(sql, function(err) {
    err ?
      hasError(err, 'Error creating table') :
      (console.log('✅ Table "tbl_student" created!'), insertRecord());
  });
}

// Step 3: Insert one record into the table
function insertRecord() {
  const sql = 'INSERT INTO students_db.tbl_student (name, email) VALUES (?, ?)';
  const values = ['Meet', 'meet@gmail.com']; // data to insert

  connection.execute(sql, values, function(err, result) {
    err ?
      hasError(err, 'Error inserting record') :
      (console.log('✅ Record inserted! ID:', result.insertId), connection.end());
  });
}

// Show error message if something goes wrong
function hasError(err, message) {
  if (err) {
    console.error('❌', message, ':', err);
    return true;
  }
  return false;
}
