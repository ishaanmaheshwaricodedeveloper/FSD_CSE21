const http = require("http");

const server = http.createServer((req, res) => {

    // Set response headers
    res.setHeader("Content-Type", "text/plain");

    if (req.url === "/") {
        // 200 - OK
        res.writeHead(200);
        res.end("Hello World");
    }

    else if (req.url === "/forbidden") {
        res.writeHead(403);
        res.end("403 - Forbidden");
    }

    else {
        // 404 - Not Found
        res.writeHead(404);
        res.end("404 - Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});