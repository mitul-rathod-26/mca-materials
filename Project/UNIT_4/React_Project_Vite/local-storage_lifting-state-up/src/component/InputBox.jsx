import React from 'react'

function InputBox({ onTextChange }) {
    return (
        <div>
            <h3>Child A: Input Tag</h3> 
            <input
                type="text"
                placeholder="Type here..."
                onChange={(e) => onTextChange(e.target.value)}
            />
        </div>
    );
}

export default InputBox;