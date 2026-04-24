import React from 'react'

function LocalStorage() {

    // Clear all data from localStorage
    localStorage.clear()

    // Create a user object
    const users = {
        username: "Johnkkkkk",
        password: "John@321",
        age: 18,
    }

    // Convert object to string using JSON.stringify() & store in localStorage
    localStorage.setItem("user", JSON.stringify(users))

    // Get data from localStorage & convert back to object
    const getUser = JSON.parse(localStorage.getItem('user'))
    console.log(getUser)

    return (
        <div>
            <h1>Hello, {getUser.username}, {getUser.password}, {getUser.age}</h1>
        </div>
    )
}

export default LocalStorage
