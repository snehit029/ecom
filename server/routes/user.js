const { verify } = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

const router = require('express').Router()


router.put("/:id",   verifyTokenAndAuthorization , async (req,res)=>{
    if(req.body.password){
        req.body.password =  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true});

    res.status(201).json(updatedUser)
  }
   catch (err) {
      res.status(500).json(err);
   }
})


//DELETE

router.delete('/:id', verifyTokenAndAuthorization, async(req, res)=>{
    try{
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("user is deleted")
    } catch(err){
      res.status(500).json(err);
    }
})

//get user

router.get('/find/:id', verifyTokenAndAdmin, async(req, res)=>{
    try{
     const user = await User.findById(req.params.id)
      const {password, ...others} = user._doc;

       res.status(200).json(others);
    } catch(err){
      res.status(500).json(err);
    }
})

//get all users

router.get('/', verifyTokenAndAdmin, async(req, res)=>{
    try{
     const users = await User.find();

       res.status(200).json(users);
    } catch(err){
      res.status(500).json(err);
    }
})

module.exports= router
