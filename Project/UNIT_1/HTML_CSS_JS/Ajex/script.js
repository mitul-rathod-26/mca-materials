
/// for the fetch the data:
let fetchBtn = document.getElementById('fetchBtn');
fetchBtn.addEventListener('click', buttonClickHandler);

function buttonClickHandler() {
    console.log('You clicked fetch button');

    // Instantiate an xhr object
    const xhr = new XMLHttpRequest();

    // Open the object (true = async, false = sync)
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1', true);

    // What to do when progress is loaded
    xhr.onprogress = function () {
        console.log('On progress');
    }

    // What to do when response is ready
    xhr.onload = function () {
        if (this.status === 200) {
            console.log(this.responseText);
            // Convert JSON string to JavaScript object
            const data = JSON.parse(this.responseText);
            // Display the data on the webpage
            document.getElementById('dataDisplay').innerHTML = `
                <p><strong>User ID:</strong> ${data.userId}</p>
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Body:</strong> ${data.body}</p>
            `;
        }
        else {
            console.log("Some error occured");
        }
    }

    // Send the request
    xhr.send();
    console.log("We are done");
}

// =======================================================================

































/// for the post the data:
let sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', sendButtonClickHandler);

function sendButtonClickHandler() {
    console.log('You clicked send button');

    // Instantiate an xhr object
    const xhr = new XMLHttpRequest();

    // Open the object
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);

    // Set the request header for JSON content
    xhr.setRequestHeader('Content-type', 'application/json');

    // What to do when response is ready
    xhr.onload = function () {
        if (this.status === 201) {  // POST usually returns 201 (Created)
            console.log(this.responseText);
            // Convert JSON string to JavaScript object
            const data = JSON.parse(this.responseText);
            // Display the data on the webpage
            document.getElementById('dataDisplay').innerHTML = `
                <p><strong>User ID:</strong> ${data.userId}</p>
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Body:</strong> ${data.body}</p>
            `;
        }
        else {
            console.log("Some error occured");
        }
    }

    // Create the data to be sent
    const dataToSend = {
        title: "Ajex Example",
        body: "Sending data using button click event...!!!!",
        userId: 1
    };

    // Send the request with the data
    xhr.send(JSON.stringify(dataToSend));
    console.log("We are done posting");
}


/*

Asynchronous (Non-Blocking):
    Tasks do NOT wait.
    Other work can continue while something is happening.

Synchronous (Step-by-Step):
    Tasks happen one after another.
    The next task must wait until the previous task finishes.


*/