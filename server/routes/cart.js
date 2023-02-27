const { query } = require('express');
const { verify } = require('jsonwebtoken');
const Cart = require('../models/Cart');
const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

const router = require('express').Router();

//CREATE

router.post("/", verifyToken, async(req,res)=>{
    const newProduct = new Cart(req.body)

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})


router.put("/:id",   verifyTokenAndAuthorization , async (req,res)=>{
  try{
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true});

    res.status(201).json(updatedCart)
  }
   catch (err) {
      res.status(500).json(err);
   }
})


//DELETE

router.delete('/:id', verifyTokenAndAuthorization, async(req, res)=>{
    try{
      await Cart.findByIdAndDelete(req.params.id)
      res.status(200).json("Product has been deleted")
    } catch(err){
      res.status(500).json(err);
    }
})

//get user cart

router.get('/find/:userid', verifyTokenAndAuthorization,  async(req, res)=>{
    try{
     const userCart = await Cart.findOne({ userId: req.params.userId })

       res.status(200).json(userCart);
    } catch(err){
      res.status(500).json(err);
    }
})

//get all products

router.get('/', verifyTokenAndAdmin,  async(req, res)=>{
    try{
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch(err){
      res.status(500).json(err);
    }
})

module.exports= router


