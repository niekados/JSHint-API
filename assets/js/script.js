const API_KEY = "vjOpnoZuBoGoPbX8Jh-FokbNXj8";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

// bootstratp doc - Create a modal with a single line of JavaScript:
document.getElementById("status").addEventListener("click", e => getStatus(e));

// asyncronous promise - When we’re handling promises, we have two ways of doing it.
// We can chain “.then”s as we did before, 
// or we can wrap the promises in  an async function - like this - and then await the promise coming true.

// If you make a GET request to the /api endpoint, you need to supply the API key as a GET parameter, like so:
// https://ci-jshint.herokuapp.com/api?api_key=thisismykey
async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        console.log(data.expiry);
    }
}