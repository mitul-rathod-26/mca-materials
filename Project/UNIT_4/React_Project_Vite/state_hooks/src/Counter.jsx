import { useState } from "react";

function Counter() {
    // "count" we can say, state naam or varible, "setCount" is function, to used for chanage the state 
    const [count, setCount] = useState(0);   // 0 initial value 

    return (
        <div style={{ margin: "100px 100px" }}>
            <h2>Current count: {count}</h2>

            <button onClick={() => setCount(count + 1)}>+ Add</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={() => setCount(count - 1)}>- Remove</button>

        </div>
    );
}

export default Counter