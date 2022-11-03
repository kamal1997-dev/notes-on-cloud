const express=require('express');
const router=express.Router();
const User=require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchUser');


const JWT_SECRET="kamalsharmalearner";



//route for creating user no login required

router.post("/createuser",[
    body('email','Enter a Valid email').isEmail(),
    body('name', 'Enter a Valid name').isLength({min:3}),
    body('password','Password must be atleast of 5 characters').isLength({min:5}),

                     ], async(req,res)=>{
                      //if there are errors ,return bad req and errors
                      let success=false;
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                          return res.status(400).json({success, errors: errors.array() });
                        }
                        //check  weather the user with this email exists already
                      try{
                        let user= await User.findOne({email:req.body.email})//will return a user 
                        
                        if(user){
                          return res.status(400).json({success,error:"Sorry  a user with email is already exists"})
                        }
                          const salt= await bcrypt.genSalt(10);
                          const  securedpass= await bcrypt.hash(req.body.password,salt);
                         user=await User.create({
                            name: req.body.name,
                            email:req.body.email,
                            password: securedpass
                          })
                         const data={
                          user:{
                            id:user.id
                          }
                         } 
                         //console.log(data);
                         const authtowken=jwt.sign(data,JWT_SECRET);//sync method
                         //console.log(jwtdata);
                        success=true;
                       res.json({success,authtowken})
                        

                      }
                      catch(error){
                        console.log(error.message);
                        res.status(500).send("Internal Server Error");

                      }
                      
   
  
    
});

// end point for authenticating  a user --/api/auth/login    and no login required
router.post("/login",[
  body('email','Enter a Valid email').isEmail(),
  body('password','password cannot be blank ').exists()

              ], async(req,res)=>{
                let success=false;
              const errors = validationResult(req);
               if (!errors.isEmpty()) {
                 return res.status(400).json({ success,errors: errors.array() });
                  }

                  const{email,password}=req.body;
                  try{
                    let user= await User.findOne({email})
                    if(!user){
                     // success=false;
                      return res.status(400).json({success,error:"Please try to login with correct credentials "})
                    }
                    const passwordCompare= await bcrypt.compare(password,user.password);
                    //compare will return true if pass matches and false if doesnt matches 
                    if(!passwordCompare){
                      //success=false;
                      return res.status(400).json({success,error:"Please try to login with correct credentials "})
                    }
                    const data={
                      user:{
                        id:user.id
                      }
                     } 
                     const authtowken=jwt.sign(data,JWT_SECRET);
                     success=true;
                     res.json({ success,authtowken});


                  }
                  catch(error){
                    console.log(error.message);
                        res.status(500).send("Internal Server Error ");

                  }



                   });
                   //route3 for getting logged in user details
                   //--->/api/auth/getuser--->login is required
                   router.post('/getuser', fetchuser,async (req,res)=>{
                    try{
                       const userId=req.user.id;
                      const user=await User.findById(userId).select("-password");
                      res.send(user)

                    }
                    catch(error)
                    {
                      console.log(error.message);
                      res.status(500).send("Internal Server Error ");

                    }



                   })


module.exports=router;