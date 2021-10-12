document.getElementById("runCodeForm").onsubmit = handleSubmit;

function handleSubmit(event) {
    event.preventDefault();
    sendRequest().then(response => {
        console.log(response)
        return response.text()
    }).then(data => {
        console.log(data);
        document.getElementById("output").value = data;
    });
}

function sendRequest() {
    return fetch('https://a8bnfjct51.execute-api.us-east-1.amazonaws.com/prod/run', {
        method: 'POST',
        body: JSON.stringify({
            code: document.getElementById("code").value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}