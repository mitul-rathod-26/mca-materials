import React from 'react'

function DisplayBox(props) {
    return ( 
        <div>
            <h3>Child B: Display Input data</h3>
            <p>You are typing: <strong>{props.value}</strong></p>
        </div>
    );
}

export default DisplayBox;