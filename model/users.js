const mongoose =require("mongoose");

const Userschema = new mongoose.Schema({
     
   name: {
     type:String,
     required:true
   },
   age:{
    type:String,
    required:true
   },
   course:{
     type:String,
     required:true
   },
   passoutyear:{
    type:String,
    required:true
  },
  createdAt:{
    type: Date,
    required:true,
    default:Date.now
  }



})

module.exports = mongoose.model('User',Userschema);