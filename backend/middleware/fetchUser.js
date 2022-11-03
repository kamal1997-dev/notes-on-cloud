const jwt = require('jsonwebtoken');
const JWT_SECRET="kamalsharmalearner";

const fetchuser=(req,res,next)=>{
    //get  the user from the jwt token and add id to req obj
     const token=req.header("auth-token");

     if(!token){
        res.status(401).send({error:"please authenticate using a valid user"});

     }
    
        try{
               const data=jwt.verify(token,JWT_SECRET) ;
               
               req.user=data.user;
               //console.log(req.user);
               next();
           }
     catch(error){
        res.status(401).send({error:"please authenticate using a valid user"});

     }


}







module.exports=fetchuser;