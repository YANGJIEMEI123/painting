const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// 跨域处理
app.use(require('./Tools/cors').cors);
//parse content-type   application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//content-type   application/json
app.use(bodyParser.json());


// 启用子路由-用户模块
app.use('/user', require('./Controller/UserController'));
app.use('changed',require('./Controller/ChangedController'))
app.use('/cate', require('./Controller/CateController'));



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

app.listen(8081, () => {
    console.log('Example app listening on port 8081!');
});