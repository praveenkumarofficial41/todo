const express=require('express')
const app=express()
const cors=require('cors')
const port=3001
const mongoose=require('mongoose')
const tododata=require('./models/tododata')
const auth=require('./models/auth')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
app.use(express.json())
app.use(cors())
require('dotenv').config()

mongoose.connect(process.env.MONGO,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((res)=>
console.log(res.connection.host)
).catch((error)=>
console.log(error)
)

app.post('/login',async (req,res)=>{
    try {
        let {username,password}=req.body.data
        let search=await auth.find({username})
        let result=search[0].password
        let check=bcrypt.compareSync(password,result)
        if(check){
            let token=jwt.sign({username},process.env.SECRET_KEY,{expiresIn:'30m'})
            res.send({message:"Signup successfull",token:token,status:200}).status(200)
        }
        else{
            res.send({message:"Signup unsuccessfull",status:401}).status(401)
        }
    } catch (error) {
        res.send({error}).status(500)
    }
})

app.post('/signup',async (req,res)=>{
    try {
        let {username,password}=req.body.data
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password,salt)
        let userauth={
            username:username,
            password:hash
        }
        let register=new auth(userauth)
        let result=await register.save()
        if(result){
            let token=jwt.sign({username},process.env.SECRET_KEY,{expiresIn:'30m'})
            res.send({result:result,token:token}).status(200)
        }
        else{
            res.send({message:"Signup unsuccessfull"}).status(500)
        }

    } catch (error) {
        res.send({error}).status(500)
        }
})


let middle=(req,res,next)=>{
    try {
         let token=req.headers.authorization

        if(token){
            let jwtcheck=jwt.verify(token,process.env.SECRET_KEY)
            if(jwtcheck){
                next()
                return 
            }
        }
        res.send({message:'unauthorized',statuscode:401}).status(401)
    } catch (error) {
        res.send({message:error.message}).status(500)
        console.log(error.message)
    }
}
let authroutes =['/task','/view','/delete/:id','/update/:id']
app.use(authroutes,middle)
app.post('/task',async (req,res)=>{
    try {
        let {task}=req.body
        let token=req.headers.authorization
        let jwtcheck=jwt.verify(token,process.env.SECRET_KEY)
        let userdata={username:jwtcheck.username,task}
        let data=new tododata(userdata)
        let describtion=await data.save()
        res.send({message:describtion,response:"saved"}).status(200)
    } catch (error) {
        console.log(error)
        res.send({result:error.message})
    }
    
    });

app.get('/view',async (req,res)=>{
    try {
        let token=req.headers.authorization
        let jwtcheck=jwt.verify(token,process.env.SECRET_KEY)
        let datafe=await tododata.find({"username":jwtcheck.username}).sort({"_id": -1})
        res.send({data:datafe,message:"successfully retrived",statuscode:200}).status(200)
    } catch (error) {
        console.log(error)
        res.send({result:error})
    }
})
    
app.delete('/delete/:id',async (req,res)=>{
    try {
        let {id}=req.params
        let received=await tododata.findByIdAndDelete(id)
        res.send({data:received,message:"successfully deleted"}).status(200)

    } catch (error) {
        console.log(error)
        res.send({result:error})
    }
    

})


app.put('/update/:id',async (req,res)=>{
    try {
        let {id}=req.params
        let  {editTask}=req.body
        let update={task:editTask}
        let result=await tododata.findByIdAndUpdate(id,update)
        res.send({newdata:update,previousdata:result,message:"successfully update"}).status(200)
    } catch (error) {
        console.log(error)
        res.send({result:error})
    }
    
})




app.listen(port,()=>console.log('running on'+port))