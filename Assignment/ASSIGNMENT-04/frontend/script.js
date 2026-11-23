const API_URL = "http://localhost:3000/api/requests";

const form = document.getElementById("requestForm");

const requestId = document.getElementById("requestId");
const studentName = document.getElementById("studentName");
const email = document.getElementById("email");
const category = document.getElementById("category");
const description = document.getElementById("description");
const priority = document.getElementById("priority");

const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");

const requestList = document.getElementById("requestList");
const requestCount = document.getElementById("requestCount");


// GET ALL REQUESTS

async function getRequests() {

    const response = await fetch(API_URL);

    const requests = await response.json();

    displayRequests(requests);
}


// DISPLAY REQUESTS

function displayRequests(requests) {

    requestList.innerHTML = "";

    requestCount.textContent =
        `${requests.length} request${requests.length !== 1 ? "s" : ""}`;


    if (requests.length === 0) {

        requestList.innerHTML = `
            <div class="empty">
                No requests submitted yet.
            </div>
        `;

        return;
    }


    requests.forEach((request) => {

        const card = document.createElement("div");

        card.className = "request-card";

        card.innerHTML = `

            <div class="request-top">

                <div>

                    <div class="request-title">
                        ${request.category}
                    </div>

                    <div class="request-id">
                        REQUEST #${request.id}
                    </div>

                </div>

                <div class="priority">
                    ${request.priority.toUpperCase()}
                </div>

            </div>


            <div class="request-info">

                <div>
                    <strong>Student:</strong>
                    ${request.studentName}
                </div>

                <div>
                    <strong>Email:</strong>
                    ${request.email}
                </div>

            </div>


            <div class="request-description">

                ${request.description}

            </div>


            <div class="request-actions">

                <button
                    class="edit-btn"
                    onclick="editRequest(${request.id})"
                >
                    EDIT
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteRequest(${request.id})"
                >
                    DELETE
                </button>

            </div>

        `;

        requestList.appendChild(card);
    });
}


// POST / PUT

form.addEventListener("submit", async (event) => {

    event.preventDefault();


    const requestData = {

        studentName: studentName.value,

        email: email.value,

        category: category.value,

        description: description.value,

        priority: priority.value

    };


    let response;


    if (requestId.value) {

        // PUT

        response = await fetch(
            `${API_URL}/${requestId.value}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(requestData)
            }
        );

    } else {

        // POST

        response = await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(requestData)
            }
        );
    }


    if (response.ok) {

        resetForm();

        getRequests();

    }

});


// EDIT REQUEST

async function editRequest(id) {

    const response =
        await fetch(`${API_URL}/${id}`);

    const request =
        await response.json();


    requestId.value = request.id;

    studentName.value = request.studentName;

    email.value = request.email;

    category.value = request.category;

    description.value = request.description;

    priority.value = request.priority;


    submitButton.textContent = "UPDATE REQUEST";

    cancelButton.style.display = "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// DELETE REQUEST

async function deleteRequest(id) {

    const confirmDelete =
        confirm("Delete this request?");


    if (!confirmDelete) {
        return;
    }


    const response =
        await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


    if (response.ok) {

        getRequests();

    }

}


// RESET FORM

function resetForm() {

    form.reset();

    requestId.value = "";

    submitButton.textContent =
        "SUBMIT REQUEST";

    cancelButton.style.display =
        "none";
}


// CANCEL EDIT

cancelButton.addEventListener(
    "click",
    resetForm
);


// LOAD REQUESTS

getRequests();