import { useEffect, useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/files?search=${encodeURIComponent(search)}`);
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [search]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>File Search</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search files..."
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "0.75rem",
          marginBottom: "1rem",
          fontSize: "1rem",
        }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {documents.length > 0 ? (
          documents.map((doc) => (
            <li
              key={doc.id}
              style={{
                marginBottom: "0.75rem",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <strong>{doc.name}</strong>
              <div>
                <a href={`http://localhost:3000/files/${doc.file}`} target="_blank" rel="noreferrer">
                  {doc.file}
                </a>
              </div>
            </li>
          ))
        ) : (
          <li>No files found.</li>
        )}
      </ul>
    </div>
  );
};

export default App;