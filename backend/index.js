const express=require('express');
const connectToMongo=require('./db');
const cors=require('cors');


connectToMongo();

const app=express();
const port=5000;
//available routes
app.use(cors());
app.use(express.json());//we need this middleware if we want to use req.body in application
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

app.listen(port,()=>{
    console.log(`server is listening at ${port}`);
})