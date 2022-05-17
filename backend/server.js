var express=require("express");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var app = express();
var mongoClient=require('mongodb').MongoClient;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
mongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err)
    {
        console.log("connection failed");
    }
    else
    {
        db=client.db('empdb');
        console.log("connection is successfully completed");
    }
});

app.get('/home',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get('/emps',(req,res)=>{
    db.collection("emp").find().toArray((err,items)=>{
        res.write(JSON.stringify(items));
        res.end();
    });
})


app.post('/addemp',(req,res)=>{
    db.collection("emp").insertOne(req.body);
    res.write("Data inserted");
    res.end();
})

app.put('/updateemp/:id',(req,res)=>{
    var id=parseInt(req.params.id);
    db.collection("emp").updateOne({"_id":id},{$set:{name:req.body.name}});
    res.write("Data updated");
    res.end();
});

app.delete('/deleteemp/:id',(req,res)=>{
    var id=parseInt(req.params.id);
    db.collection("emp").deleteOne({"_id":id});
    res.write("Data deleted");
    res.end();
})

app.get('/empget/:id',(req,res)=>{
// app.get('/empget/:id',(req,res)=>{
    db.collection("emp").find({"_id":parseInt(req.params.id)}).toArray((err,items)=>{
        console.log(items);
        res.write(JSON.stringify(items));
        console.log("retrieved single record successfully");
        res.end();
    })
})

app.get("/",verifyToken,(req,res)=>{
// app.get("/",(req,res)=>{
    res.send("this is testing page");
})

app.post("/login",(req,res)=>{
    uname=req.body.username
    pwd=req.body.password
    db.collection("users").findOne({"username":uname,"password":pwd})
    .then((result)=>{
        if(result){
            const token=jwt.sign({'username':uname},"@456",{})
            res.json({
                success: true,
                message:"AUthenticatation success",
                token:token
            });
            res.end();
        }
        else{
            res.json({
                success:false,
                message:"Invalid username or password"
            });
        }
    })
    .catch((err)=>{
        console.log("Error : " +err);
    })
})


function verifyToken(req,res,next)
{
    let token=req.headers['authentiaction']
    if(token){
        token=token.split(' ')[1];
        console.log(token);
        jwt.verify(token,"@456",(err,decoded)=>{
            if(err)
            {
                return res.json({
                    success:false,
                    message:"Token is not valid"
                });
            }
            else{
                next();
            }
        })
    }
    else{
        return res.json({
            success:false,
            message:"A token is required for authentication"
        });
    }
}

app.listen(3000,()=>{
    console.log("server is listening at 3000");
})
