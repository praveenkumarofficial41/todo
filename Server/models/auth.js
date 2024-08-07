const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }


})

let collection= mongoose.model('auth',schema)
module.exports=collection