const express=require("express")
const app=express()

var mongoose=require("mongoose")
const path=require('path')
app.use(express.static('public'))
app.set('view engine','ejs')

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/myDatabase")
var db=mongoose.connection
db.on('error',()=>console.log("Error Connection"))
db.once('open',()=>console.log("Successfully connected to the Database"))


app.post('/register_form',(req,res)=>{
    var studentName=req.body.sname 
    var course=req.body.course
    var age=req.body.age
    var email=req.body.email
    var data={
        "StudentName":studentName,
        "Course":course,
        "Age":age,
        "Email":email
    }
    db.collection('myollection').insertOne(data,(err,collection)=>{
        if(err)
        throw err;
        else
        console.log("Document Successfully inserted into the Database")
    })
    return res.redirect('registration_successful.html')
})


app.get('/',(req,res)=>{
  return res.render('form')  
    res.end()
})


app.listen(3000,()=>console.log("Server Started")) 