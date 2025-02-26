import mongoose from "mongoose";
import Product from "../model/product.model.js";

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("error in fetcging products:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const createProducts = async (req, res) => {
    const product = req.body; // users sends data
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in creating Product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updateProduct });
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
    }
};

export const deleteProduct =  async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    } catch (error) {
        console.log("error in deleting products:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};