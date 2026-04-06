// Step 1: Install MySQL driver using the terminal "npm install mysql2"

// Step 2: Create connection 
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users'
});

connection.connect((err) => {
  err ?
    hasError(err) :
    console.log('✅ Connected to MySQL..! \n\n');
});


// Step 3: INSERT user
// const sql = 'INSERT INTO tbl_users (name, email) VALUES (?, ?)';
// const values = ['Meet', 'meet@gmail.com'];
// connection.query(sql, values, (err, result) => {
//   err ?
//     hasError(err) :
//     console.log('\n\nInserted ID:', result.insertId);
// });


/// insert multiple user
// const usersData = [
//   ['Jeet', 'jeet@gmail.com'],
//   ['Rahul', 'rahul@gmail.com'],
//   ['Akash', 'akash@gmail.com'],
// ];

// const insert_multi_sql = 'INSERT INTO tbl_users (name, email) VALUES ?';
// const values = [usersData];
// connection.query(insert_multi_sql, values, (err, result) => {
//   err ?
//     hasError(err) :
//     console.log('\n\nUsers Inserted', result.insertId);
// });


// Step 4: UPDATE user
// const update_sql = 'UPDATE tbl_users SET name="Jeetss" where email="jeet@gmail.com"';
// connection.query(update_sql, (err, result) => {
//   err ?
//     hasError(err) :
//     console.log('\n\nUsers Updated', result.insertId);
// });

// Step 5: DELETE user
// const delete_sql = 'DELETE FROM tbl_users WHERE name="Jeetss Bhai"';
// connection.query(delete_sql, (err) => {
//   err ?
//     hasError(err) :
//     console.log('\n\nUser Deleted..!');
// });


// Step 6: SELECT / Show data
connection.query('SELECT * FROM tbl_users', (err, results) => {
  err ?
    hasError(err) :
    console.log('All users:', results, "\n\n");
});

// Step 7: Close connection
connection.end();

// common error function
function hasError(err) {
  if (err) {
    console.error('❌ Error:', err, "\n\n");
    return;
  }
}
