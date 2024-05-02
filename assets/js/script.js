// API - https://ci-jshint.herokuapp.com/

const API_KEY = "vjOpnoZuBoGoPbX8Jh-FokbNXj8";
const API_URL = "https://ci-jshint.herokuapp.com/api";

// bootstratp doc - Create a modal with a single line of JavaScript:
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

// event listeners
document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

// asyncronous promise - When we’re handling promises, we have two ways of doing it.
// We can chain “.then”s as we did before, 
// or we can wrap the promises in  an async function - like this - and then await the promise coming true.
async function postForm(e) {

    // https://developer.mozilla.org/en-US/docs/Web/API/FormData - 
    // FormData interface provides a way to construct a set of key/value pairs representing form fields and their values
    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form, // attaches form as a body of the request
    });

    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }
}

function displayErrors(data) {
    
    let heading = `JSHint results for ${data.file}`;

    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}

// If you make a GET request to the /api endpoint, you need to supply the API key as a GET parameter, like so:
// https://ci-jshint.herokuapp.com/api?api_key=thisismykey
async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {

    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultsModal.show();
}