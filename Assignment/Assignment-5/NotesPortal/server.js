import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const documents = [
  { id: 1, name: "FSD", file: "fsd.pdf" },
  { id: 2, name: "React", file: "react.pdf" },
  { id: 3, name: "Document 3", file: "doc3.pdf" },
  { id: 4, name: "Document 4", file: "doc4.pdf" },
  { id: 5, name: "Document 5", file: "doc5.pdf" },
];

app.use(cors());

app.get("/api/files", (req, res) => {
  const search = (req.query.search || "").toString().trim().toLowerCase();

  const filteredDocuments = documents.filter((doc) => {
    return (
      doc.name.toLowerCase().includes(search) ||
      doc.file.toLowerCase().includes(search)
    );
  });

  res.json(filteredDocuments);
});

app.use("/files", express.static(path.join(__dirname, "files")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});