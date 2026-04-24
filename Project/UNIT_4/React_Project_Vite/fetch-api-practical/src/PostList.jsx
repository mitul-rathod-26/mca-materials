import React, { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => { 
    //  async function 
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=5'
        );
        const data = await response.json();
        console.log("User Data ==>> ", data);
        setPosts(data);
      } catch (err) {
        console.log("Error ==>>>", err.message);
        setError('Failed to load posts.');
      }
    };

    fetchPosts();  // Call the function
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return <ul>{posts.map(p => <li key={p.id}>{p.id}</li>)}</ul>;
}

export default PostList;
