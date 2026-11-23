import { useEffect, useState } from "react";
import "./App.css"; // BUG FIX: CSS file existed but was never imported, so no styles applied

const API_URL = "http://localhost:5000/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // BUG FIX: no loading/error state before - a down backend just failed silently
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Get Products
  const getProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to load products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Could not reach the server");
    } finally {
      setLoading(false);
    }
  };

  // Run when page loads
  useEffect(() => {
    getProducts();
  }, []);

  // Add Product
  const addProduct = async (e) => {
    e.preventDefault();

    // BUG FIX: no validation before - empty fields could be submitted
    if (!name.trim() || !category.trim() || price === "") {
      setError("Please fill in name, price and category.");
      return;
    }
    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      setError("Price must be a valid positive number.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const product = {
        name: name.trim(),
        price: numericPrice, // BUG FIX: was sent as a raw string before
        category: category.trim(),
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Failed to add product");

      // Clear form
      setName("");
      setPrice("");
      setCategory("");

      // Get updated products
      await getProducts();
    } catch (err) {
      setError(err.message || "Could not add product");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    setError("");
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete product");
      await getProducts();
    } catch (err) {
      setError(err.message || "Could not delete product");
    }
  };

  return (
    <div className="app">
      <h1>Product Management System</h1>

      {error && <div className="error-banner">{error}</div>}

      {/* Add Product Form */}
      <form className="product-form" onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          min="0"
          step="0.01"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Product"}
        </button>
      </form>

      <hr />

      {/* Product Table */}
      {loading ? (
        <p className="status-text">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="status-text">No products yet. Add one above.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>₹{Number(product.price).toLocaleString("en-IN")}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
