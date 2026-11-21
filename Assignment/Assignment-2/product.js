import express from "express";
import products from "./product.json" with { type: "json" };

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
    res.status(200).json(products);
});


app.get("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
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

    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({
            message: "Price must be a positive number"
        });
    }

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});



app.put("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({
            message: "Name, price and category are required"
        });
    }

    if (typeof price !== 'number' || price <= 0) {
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

    const id = parseInt(req.params.id);

    const productIndex = products.findIndex(
        product => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});