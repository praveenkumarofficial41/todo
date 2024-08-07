const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    },
    completed:{
        type:String,
        default:false
    },
    date:{
        type:Date,
        default:new Date()

    }
})

let mongoexpo=mongoose.model('tododata',schema)
module.exports=mongoexpo