const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchUser');
const Notes=require("../models/Notes");
const { body, validationResult } = require('express-validator');

//get all the notes but user should be logged in

router.get("/fetchallnotes",fetchuser, async(req,res)=>{
    try{
         const  notes=await Notes.find({user:req.user.id});
        res.send(notes);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

    
});
//creating a new note---login required
router.post("/createNotes",fetchuser,[
    body('title','Enter a Valid  title').isLength({min:3}),
    body('description','description must be atleast of 5 characters').isLength({min:5}),
   

], async(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const{title,description,tag}=req.body;
        const note=new Notes({title,description,tag,user:req.user.id});
        const savednote=await note.save();
        res.send(savednote);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
    
});
//route for updating existing note---

router.put('/updateNote/:id',fetchuser, async(req,res)=>{
    //we can use validation using validator like we did in other routes  if we want 
    const{title,description,tag}=req.body;
    const newNote ={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
   try{
     //find the note to be updated
     let note= await Notes.findById(req.params.id);
     if(!note){ return res.status(404).send("Not Found")};
    // console.log(note.user.toString());
     if(note.user.toString()!==req.user.id){
         return res.status(401).send("Not Allowed")//401 is for un authorized 
     }
     note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
     res.json(note);

   }
   catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");

   }
})




// route for deleting a note ----id is required ---user must be logged in 
router.delete('/deleteNote/:id',fetchuser, async(req,res)=>{
    try{
        //find the note to be deleted
    let note= await Notes.findById(req.params.id);
    if(!note){ return res.status(404).send("Not Found")};
   // console.log(note.user.toString());
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")//401 is for un authorized 
    }
    note =await Notes.findByIdAndDelete(req.params.id);
    res.json({Success:"Note has been deleted",note:note});

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");

    }
})





module.exports=router;