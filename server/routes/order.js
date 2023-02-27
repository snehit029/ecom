const { query } = require('express');
const { verify } = require('jsonwebtoken');
const Order = require('../models/Order');
const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

const router = require('express').Router();

//CREATE

router.post("/", verifyToken, async(req,res)=>{
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})


router.put("/:id",   verifyTokenAndAdmin , async (req,res)=>{
  try{
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true});

    res.status(201).json(updatedOrder)
  }
   catch (err) {
      res.status(500).json(err);
   }
})


//DELETE

router.delete('/:id', verifyTokenAndAdmin, async(req, res)=>{
    try{
      await Order.findByIdAndDelete(req.params.id)
      res.status(200).json("Order has been deleted")
    } catch(err){
      res.status(500).json(err);
    }
})

//get user order

router.get('/find/:userid', verifyTokenAndAdmin,  async(req, res)=>{
    try{
     const userOrder = await Order.findOne({ userId: req.params.userid })

       res.status(200).json(userOrder);
    } catch(err){
      res.status(500).json(err);
    }
})

//get all orders

router.get('/', verifyTokenAndAdmin,  async(req, res)=>{
    try{
      const Orders = await Order.find();
      res.status(200).json(Orders);
    } catch(err){
      res.status(500).json(err);
    }
})

module.exports= router


