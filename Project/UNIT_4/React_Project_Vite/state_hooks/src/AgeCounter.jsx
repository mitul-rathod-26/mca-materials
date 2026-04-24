import { useState, useEffect } from "react";

function AgeCounter() {
    const [age, setAge] = useState(0);

    function addAgeFun() {
        console.log("Before age: ", age);
        setAge(age + 1);
    }

    function removeAgeFun() {
        console.log("Before age: ", age);
        setAge(age - 1);
    }

    /*
        -> useState → stores data (age)
        -> useEffect → reacts when data changes
            -> Perform side effects like (alert, API call, Notification, and etc.)
     */

    // Runs after every render (when component shows or updates)
    useEffect(() => {
        console.log("Run everytime when component render...!");
    });

    // Runs only once when component first appears on screen
    useEffect(() => {
        console.log("Run at once when component show...!");
    }, []);

    // Runs only when the "age" state variable changes (and also once at start)
    useEffect(() => {
        console.log("Updated age:", age);
        document.title = `User current age: ${age}`;
    }, [age]);

    return (
        <div style={{ margin: "100px 100px" }}>
            <h2>User current age: {age}</h2>

            <button onClick={addAgeFun}>+ Add Age</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={removeAgeFun}>- Remove Age</button>
            <br /> <br />
            <button onMouseMove={addAgeFun}>+ Add Age Mouse Move</button>
            &nbsp;&nbsp;&nbsp;

            <button onMouseMove={removeAgeFun}>- Remove Age Mouse Move</button>
        </div>
    );
}

export default AgeCounter;