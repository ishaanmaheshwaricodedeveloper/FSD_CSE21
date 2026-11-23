import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = 5000;

// Required because we are using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "requests.json");

app.use(express.json());


// GET all requests
app.get("/api/requests", (req, res) => {

    const data = fs.readFileSync(filePath, "utf-8");

    const requests = JSON.parse(data);

    res.json(requests);
});


// GET request by ID
app.get("/api/requests/:id", (req, res) => {

    const data = fs.readFileSync(filePath, "utf-8");

    const requests = JSON.parse(data);

    const request = requests.find(
        (item) => item.id === Number(req.params.id)
    );

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.json(request);
});


// POST new request
app.post("/api/requests", (req, res) => {

    const data = fs.readFileSync(filePath, "utf-8");

    const requests = JSON.parse(data);

    const {
        studentName,
        email,
        category,
        description,
        priority
    } = req.body;

    const newRequest = {
        id: requests.length + 1,
        studentName,
        email,
        category,
        description,
        priority
    };

    requests.push(newRequest);

    fs.writeFileSync(
        filePath,
        JSON.stringify(requests, null, 2)
    );

    res.status(201).json(newRequest);
});


// PUT update request
app.put("/api/requests/:id", (req, res) => {

    const data = fs.readFileSync(filePath, "utf-8");

    const requests = JSON.parse(data);

    const index = requests.findIndex(
        (item) => item.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    requests[index] = {
        id: requests[index].id,
        ...req.body
    };

    fs.writeFileSync(
        filePath,
        JSON.stringify(requests, null, 2)
    );

    res.json(requests[index]);
});


// DELETE request
app.delete("/api/requests/:id", (req, res) => {

    const data = fs.readFileSync(filePath, "utf-8");

    const requests = JSON.parse(data);

    const index = requests.findIndex(
        (item) => item.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    const deletedRequest = requests.splice(index, 1);

    fs.writeFileSync(
        filePath,
        JSON.stringify(requests, null, 2)
    );

    res.json({
        message: "Request deleted successfully",
        request: deletedRequest[0]
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});