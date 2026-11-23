const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Main page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
});