const { query } = require('express');
const { verify } = require('jsonwebtoken');
const Product = require('../models/Product');
const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

const router = require('express').Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async(req,res)=>{
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})


router.put("/:id",   verifyTokenAndAdmin , async (req,res)=>{
  try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true});

    res.status(201).json(updatedUser)
  }
   catch (err) {
      res.status(500).json(err);
   }
})


//DELETE

router.delete('/:id', verifyTokenAndAdmin, async(req, res)=>{
    try{
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).json("Product has been deleted")
    } catch(err){
      res.status(500).json(err);
    }
})

//get product

router.get('/find/:id',  async(req, res)=>{
    try{
     const product = await Product.findById(req.params.id)

       res.status(200).json(product);
    } catch(err){
      res.status(500).json(err);
    }
})

//get all products

router.get('/',  async(req, res)=>{
  const { category } = req.query;
  try {

    if (category) {
     const products = await Product.find({ categories: { $in: [category] } });
     res.status(200).json(products);
    }else {
      const products = await Product.find({});
      res.status(200).json(products);
    }

  }
    
     catch(err){
      res.status(500).json(err);
    }
})

module.exports= router

