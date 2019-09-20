const express = require('express');
const mysql=require("mysql");
const bodyParser = require('body-parser');
const app = express();

//连接数据库
var mydb=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"painting"
})
mydb.connect();

// 跨域处理
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    next();
});

//parse content-type   application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//content-type   application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/publish',function(req,res){
    var sql="select * from goods where name='"+req.body.name+"'";
    mydb.query(sql,function(err,results){
        if(results.length>0){
            res.json({msg:"existed"});
        }else{
        // var newsql=`INSERT INTO goods(name,drawer,nationality,price,stock,img,description,typeid) values ('${req.body.name}','${req.body.drawer}','${req.body.nation}','${req.body.price}','${req.body.stock}','${req.body.fileList}','${req.body.descripe}','${req.body.type}')`;
        var newsql=`INSERT INTO goods(name,drawer,nationality,price,stock,description,typeid,img) 
        values ('${req.body.name}','${req.body.drawer}','${req.body.nation}','${req.body.price}','${req.body.stock}','${req.body.descripe}','${req.body.type}','${req.body.fileList}')`;        
        console.log(newsql)
        mydb.query(newsql,function(err,results){
             if(err){
                 console.log(" publish error")
                 return;
             }
             res.json(results);
           })
        }
       
    })
});
app.post('/getImg',function(req,res){
    let sql=`insert into goods(img) values('${req.body.fileList}')`;
    mydb.query(sql,function(err,results){
        console.log(sql);
        if(err){
            console.log(" img error")
            return;
        }
        res.json(results);
      })
})

//不用子路由,直接在/后面添路径
app.use('/IMG', express.static(__dirname+'/IMG'));

app.listen(8081, () => {
    console.log('Example app listening on port 8081!');
});
