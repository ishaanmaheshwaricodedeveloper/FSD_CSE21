const form = document.getElementById("requestForm");
const container = document.getElementById("requestsContainer");

let editingId = null;


// GET - Fetch all requests
async function getRequests() {
    const response = await fetch("/api/requests");
    const requests = await response.json();

    displayRequests(requests);
}


// Display requests
function displayRequests(requests) {

    container.innerHTML = "";

    if (requests.length === 0) {
        container.innerHTML = "<p>No requests submitted yet.</p>";
        return;
    }

    requests.forEach(request => {

        const div = document.createElement("div");

        div.className = "request";

        div.innerHTML = `
            <h3>${request.category}</h3>

            <p><strong>Student:</strong> ${request.studentName}</p>
            <p><strong>Email:</strong> ${request.email}</p>
            <p><strong>Problem:</strong> ${request.description}</p>
            <p><strong>Priority:</strong> ${request.priority}</p>

            <button onclick="editRequest(${request.id})">
                Edit
            </button>

            <button onclick="deleteRequest(${request.id})">
                Delete
            </button>
        `;

        container.appendChild(div);
    });
}


// POST - Submit new request
form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const requestData = {
        studentName: document.getElementById("studentName").value,
        email: document.getElementById("email").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value
    };

    if (editingId === null) {

        await fetch("/api/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

    } else {

        // PUT - Update request
        await fetch(`/api/requests/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        editingId = null;
    }

    form.reset();

    getRequests();
});


// GET single request and put data into form
async function editRequest(id) {

    const response = await fetch(`/api/requests/${id}`);
    const request = await response.json();

    document.getElementById("studentName").value = request.studentName;
    document.getElementById("email").value = request.email;
    document.getElementById("category").value = request.category;
    document.getElementById("description").value = request.description;
    document.getElementById("priority").value = request.priority;

    editingId = id;
}


// DELETE request
async function deleteRequest(id) {

    await fetch(`/api/requests/${id}`, {
        method: "DELETE"
    });

    getRequests();
}


// Load requests when page opens
getRequests();