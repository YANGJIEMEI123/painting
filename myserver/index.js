const express=require('express');


const mysql=require("mysql");
const bodyParser=require('body-parser')
var mydb=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"h519061"
})
mydb.connect();

var app=express();
//启用body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","content-type");
    next();
});

app.get('/getEmploy',function(req,res){
    // var sql="select * from employee where 1 ";//要有空格
    // if(req.query.depid){
    //     sql+="and deptid ="+req.query.depid
    // }
    var sql="SELECT * FROM 部门 LEFT JOIN employee on 部门.deptid=employee.deptid where 1 "
    if(req.query.depid){
        sql+="and employee.deptid="+req.query.depid
    }
    // console.log(req.query.depid);
     mydb.query(sql,function(err,results){
         console.log(sql)
         console.log(results);
         res.json(results);
     })
})


app.post('/reg',function(req,res){
    var sql="select * from login  where username='"+req.body.name+"'";
    mydb.query(sql,function(err,results){
        console.log(sql)
        console.log(results);
        if(results.length>0){
            res.json({msg:"existed"});
        }else{
            let sql=`insert into login(username,password) values('${req.body.name}','${req.body.pass}')`
           mydb.query(sql,function(err,results){
             if(err){
                 console.log(err);
                 return;
             }
             res.json(results);
           })
        }
       
    })
})

app.get('/login',function(req,res){
    var sql="SELECT * FROM login where username='"+req.body.name+"'and password='"+req.body.pass+"'" ;
   
    // console.log(req.query.depid);
     mydb.query(sql,function(err,results){
         console.log(sql)
         console.log(results);
         res.json(results);
     })
})

app.listen(8888,function(){
    console.log("server created,8888")
}) 