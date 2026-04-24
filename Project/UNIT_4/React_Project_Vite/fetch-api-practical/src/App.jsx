import React from 'react';
import UserList from './UserList';
import PostList from './PostList';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* <h1>Fetch API – Getting Data from Server</h1>
      <hr /> */}
{/* 
      <h2>📋 User List (using .then())</h2>
      <p>Fetched from: <code>https://jsonplaceholder.typicode.com/users</code></p>
      <UserList /> */}

      <hr />

      {/* <h2>📝 Post List (using async/await)</h2> */}
      {/* <p>Fetched from: <code>https://jsonplaceholder.typicode.com/posts?_limit=5</code></p> */}
      <PostList />
    </div>
  );
}

export default App;
