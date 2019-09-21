const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
// 跨域处理
app.use(require('./Tools/cors').cors);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req,res,next){//允许跨域
	res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","content-type");
	next();
})
var mydb=mysql.createConnection({
	host:"localhost",
	port:3307,
	user:"root",
	password:"123456",
	database:"painting"
})
mydb.connect();//创建数据库连接


app.post("/regist",function(req,res){
	var sql="select * from user where account='"+req.body.name+"'";
	mydb.query(sql,function(err,results){
        if(err){
            console.log(err);
            return;
        }
        // console.log(results);
		if(results.length>0){
			res.json({msg:"username_has_exited"})
		}else{
			let newsql=`insert into user(account,password,nickname) values('${req.body.name}','${req.body.passW}','${req.body.nickname}')`
			mydb.query(newsql,function(err,results){
				if(err){
					console.log(err);
					return;
				}
				res.json(results)
			})
		}
		
		
	})
})

app.post("/login",function(req,res){
	var sql="select * from user where account='"+req.body.account+"'";
	mydb.query(sql,function(err,results){
         if(results.account==req.body.account && results.passwd==req.body.password){
			res.json({msg:"登录成功"})
		}
	})
})

app.listen(8081, () => {
    console.log('Example app listening on port 8081!');
});