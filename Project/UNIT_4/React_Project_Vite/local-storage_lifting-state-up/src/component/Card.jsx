import React from 'react'

function Card({ children, title }) {
  return (
    <div style={{ border: '2px solid blue', borderRadius: '10px', padding: '20px', margin: '10px' }}>
      <h2 style={{ color: 'blue' }}>{title}</h2>
       
      {/* it renders whatever you put inside the tags */}
      <div className="content">
        {children} 
      </div>
    </div>
  );
}

export default Card;