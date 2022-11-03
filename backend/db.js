const mongoose=require('mongoose');
const mongouri="mongodb://localhost:27017/notebookoncloud";

const connectToMongo=()=>{

  mongoose.connect(mongouri,()=>{
    console.log("connected to mongo successfully")
})
}
module.exports=connectToMongo;
