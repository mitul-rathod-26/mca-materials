import React, { useState } from 'react'
import InputBox from './InputBox'
import DisplayBox from './DisplayBox' 

function LiftingStateUp() {
  // Create state 
  const [text, setText] = useState('');

  return (
    <div style={{ padding: '20px', border: '1px solid black', margin: '50px' }}>
      <h1>Parent Component</h1>

      {/* Pass the function to Child A so it can update the state */}
      <InputBox onTextChange={setText} />

      <br />  <hr />

      {/* Pass the actual data to Child B so it can display it */}
      <DisplayBox value={text} />
    </div>
  )
}

export default LiftingStateUp
