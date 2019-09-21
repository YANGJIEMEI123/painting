const express = require('express');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// 建立数据库,连接
let mydb = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "painting"
})
mydb.connect();

// 跨域处理

app.use(require('./Tools/cors').cors);
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    next();
});

//parse content-type   application/x-www-form-urlencoded

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


app.get('/', (req, res) => {
    res.send('Hello World!');
});
//不用子路由,直接在/后面添路径


app.get("/lunbo", (req, res) => {
    let sql = "select * from goodstype where 1";
    console.log(sql)
    mydb.query(sql, (err, results) => {
        console.log(results)
        res.json(results);
    })
})

app.get("/getOli", (req, res) => {
    let sql = "select * from goods where 1";
    console.log(sql)
    mydb.query(sql, (err, results) => {
        console.log(results)
        res.json(results);
    })
})

app.post('/publish', function (req, res) {
    var sql = "select * from goods where name='" + req.body.name + "'";
    mydb.query(sql, function (err, results) {
        if (results.length > 0) {
            res.json({
                msg: "existed"
            });
        } else {
            // var newsql=`INSERT INTO goods(name,drawer,nationality,price,stock,img,description,typeid) values ('${req.body.name}','${req.body.drawer}','${req.body.nation}','${req.body.price}','${req.body.stock}','${req.body.fileList}','${req.body.descripe}','${req.body.type}')`;
            var newsql = `INSERT INTO goods(name,drawer,nationality,price,stock,description,typeid,img) 
        values ('${req.body.name}','${req.body.drawer}','${req.body.nation}','${req.body.price}','${req.body.stock}','${req.body.descripe}','${req.body.type}','${req.body.fileList}')`;
            console.log(newsql)
            mydb.query(newsql, function (err, results) {
                if (err) {
                    console.log(" publish error")
                    return;
                }
                res.json(results);
            })
        }

    })
});


app.use('/upload', require('./Controller/UploadController'));
app.use('/IMG', express.static(__dirname+'/IMG'));




app.listen(8081, () => {
    console.log('Example app listening on port 8081!');

});

