import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);      // Store list of users
  const [loading, setLoading] = useState(true); // Loading indicator

  useEffect(() => { 
    // Fetch data from a public API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())   // Convert to JSON
      .then(data => {
        setUsers(data);           // Store in state
        setLoading(false);        // Hide loading
      })
      .catch(error => console.error('Error:', error));
  }, []);  // Empty [] = run only once on component mount

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} – {user.email}</li>
      ))}
    </ul>
  );
}

export default UserList;
