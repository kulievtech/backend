import express from "express";
import { customers, products, orders } from "./data.js";
import { validate, v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const PORT = 6000;

// Customers Endpoint

app.get("/customers", (req, res) => {
    const customerList = Object.values(customers);
    res.status(200).json({ data: customerList });
});

app.get("/customers/:customersId", (req, res) => {
    const customerId = req.params.customerId;

    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "Not a valid customer ID" });
    }

    res.status(200).json({ data: customers[customerId] });
});

app.post("/customers", (req, res) => {
    const data = req.body;
    const id = uuid;

    const customer = {
        id,
        ...data
    };
    customers[id] = customer;

    res.status(201).json({ data: customer });
});

app.put("/customers/:customersId", (req, res) => {
    const customerId = req.params.customerId;
    const updatedData = req.body;

    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "Not a valid customer ID" });
    }

    customers[customerId] = { ...customerId[customerId], updatedData };

    res.status(200).json({ data: customers[customerId] });
});

app.delete("/customer/:customersId", (req, res) => {
    const customerId = req.params.customerId;

    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "Not a valid customer ID" });
    }

    delete customers[customerId];
    res.status(204).send();
});

// Products Endpoint

app.get("/products", (res) => {
    let products = Object.values(products);

    res.status(200).json(products);
});

app.get("/products/:productsId", (req, res) => {
    const productsId = req.params.productsId;

    if (!validate(productsId) || !products[productsId]) {
        return res.status(400).json({ message: "Not a valid product ID" });
    }

    res.status(200).json({ data: products[productsId] });
});

app.post("/products", (req, res) => {
    const data = req.body;
    const id = uuid;

    const product = {
        id,
        ...data
    };

    products[id] = product;

    res.status(201).json({ data: product });
});

app.put("/products/:productsId", (req, res) => {
    const productsId = req.params.productsId;
    const updatedData = req.body;

    if (!validate(productsId) || !products[productsId]) {
        return res.status(400).json({ message: "Not a valid product ID" });
    }

    products[productsId] = {
        ...products[productsId],
        updatedData
    };

    res.status(200).json({ data: products[productsId] });
});

app.delete("/products/:productsId", (req, res) => {
    const productsId = req.params.productsId;

    if (!validate(productsId) || !products[productsId]) {
        return res.status(400).json({ message: "Not a valid product ID" });
    }

    delete products[productsId];

    res.status(204).send();
});

// Orders Endpoint

app.get("/orders", (res) => {
    let orders = Object.values(orders);

    res.status(200).json({ data: orders });
});

app.get("/orders/:ordersId", (req, res) => {
    const ordersId = req.params.ordersId;

    if (!validate(ordersId) || !orders[ordersId]) {
        return res.status(400).json({ message: "Not a valid order ID" });
    }

    res.status(200).json({ data: orders[ordersId] });
});

app.post("/orders", (req, res) => {
    const { customerId, productIds } = req.body;

    if (
        !validate(customerId) ||
        !customers[customerId] ||
        !Array.isArray(productIds) ||
        productIds.some(
            (productId) => !validate(productId) || !products[productId]
        )
    ) {
        return res
            .status(400)
            .json({ message: "Invalid customerId or productIds" });
    }

    const id = uuid;

    const order = {
        id,
        customerId,
        productIds
    };

    orders[id] = order;

    res.status(201).json({ data: order });
});

app.put("/orders/:ordersId", (req, res) => {
    const ordersId = req.params.ordersId;
    const updatedData = req.body;

    if (!validate(ordersId) || !order[ordersId]) {
        return res.status(400).json({ message: "Not a valid order ID" });
    }

    orders[ordersId] = {
        ...orders[ordersId],
        updatedData
    };

    res.status(200).json({ data: orders[ordersId] });
});

app.delete("/orders/:ordersId", (req, res) => {
    const ordersId = req.params.ordersId;

    if (!validate(ordersId) || !orders[ordersId]) {
        return res.status(400).json({ message: "Not a valid order ID" });
    }

    delete orders[ordersId];
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
