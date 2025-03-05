import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json()); // middleware for accepting JSON data in the req.body

app.use("/api/products", productRouter );

if (process.env.MODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("server running at http://localhost:" + PORT);
});