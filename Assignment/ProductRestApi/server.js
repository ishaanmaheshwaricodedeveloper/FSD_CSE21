import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.join(__dirname, "products.json");

let products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
let nextProductId = products.length + 1;

export { app, products };

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Product REST API",
    totalProducts: products.length
  });
});

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

app.post("/products", (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      message: "Name, price and category are required"
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      message: "Price must be a positive number"
    });
  }

  const newProduct = {
    id: nextProductId,
    name,
    price,
    category
  };

  products.push(newProduct);
  nextProductId += 1;

  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      message: "Name, price and category are required"
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      message: "Price must be a positive number"
    });
  }

  product.name = name;
  product.price = price;
  product.category = category;

  res.status(200).json(product);
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(productIndex, 1)[0];

  res.status(200).json({
    message: "Product deleted successfully",
    product: deletedProduct
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});