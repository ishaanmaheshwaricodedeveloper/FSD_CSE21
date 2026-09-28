import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, "requests.json");

console.log("JSON file being used:", dataFile);

app.use(express.json());
app.use(express.static("public"));

// Read requests from JSON file
function getRequests() {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
}

// Write requests to JSON file
function saveRequests(requests) {
    fs.writeFileSync(dataFile, JSON.stringify(requests, null, 2));
}

// GET all requests
app.get("/api/requests", (req, res) => {
    const requests = getRequests();
    res.json(requests);
});

// GET request by ID
app.get("/api/requests/:id", (req, res) => {
    const requests = getRequests();

    const request = requests.find(
        r => r.id === Number(req.params.id)
    );

    if (!request) {
        return res.status(404).json({ message: "Request not found" });
    }

    res.json(request);
});

// POST new request
app.post("/api/requests", (req, res) => {
    const requests = getRequests();

    const newRequest = {
        id: Date.now(),
        studentName: req.body.studentName,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    requests.push(newRequest);
    saveRequests(requests);

    res.status(201).json(newRequest);
});

// PUT update request
app.put("/api/requests/:id", (req, res) => {
    const requests = getRequests();

    const index = requests.findIndex(
        r => r.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: "Request not found" });
    }

    requests[index] = {
        ...requests[index],
        studentName: req.body.studentName,
        email: req.body.email,
        category: req.body.category,
        description: req.body.description,
        priority: req.body.priority
    };

    saveRequests(requests);

    res.json(requests[index]);
});

// DELETE request
app.delete("/api/requests/:id", (req, res) => {
    const requests = getRequests();

    const filteredRequests = requests.filter(
        r => r.id !== Number(req.params.id)
    );

    if (filteredRequests.length === requests.length) {
        return res.status(404).json({ message: "Request not found" });
    }

    saveRequests(filteredRequests);

    res.json({ message: "Request deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});