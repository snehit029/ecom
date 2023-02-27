const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

router.post("/register", async (req, res) => {
   const { username,email,password } = req.body;

   if(!username|| !email || !password){
    return res.status(400).json("Please add all fields")
   }

   //check if user exists
   const userExists = await User.findOne({email});

   if(userExists) return res.status(400).send("User already exists...");

   //create the user
   const user = await User.create({
    username,
    email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
   })

   if(user){
    return res.status(200).json({
        _id:user.id,
        username:user.username,
        email:user.email,
        token: generateToken(user._id)
      })
    } else{
      return res.status(400).json("Invalid User data")
    }
    
    
  })

  
router.post("/login", async(req,res)=>{
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })


      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
     
      const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
       
         
       if(user && Originalpassword === password){
        return res.status(200).json({
            _id:user.id,
            username:user.username,
            email:user.email,
            token: generateToken(user._id)
          })
        } else{
          return res.status(400).json("Invalid User data")
        }


})

//Generate JWT

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SEC,{
    expiresIn:"30d",
  })
}
module.exports = router;
