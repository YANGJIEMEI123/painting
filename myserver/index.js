const express = require('express');
const mysql = require("mysql");
const bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    next();
});

//parse content-type   application/x-www-form-urlencoded

app.use(bodyParser.json());
app.use(function (req, res, next) { //允许跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    next();
})

app.post("/regist", function (req, res) {
    var sql = "select * from user where account='" + req.body.name + "'";
    mydb.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            return;
        }
        // console.log(results);

        if (results.length > 0) {
            res.json({
                msg: "username_has_exited"
            })
        } else {
            let newsql = `insert into user(account,password,nickname,flag) values('${req.body.name}','${req.body.passW}','${req.body.nickname}','${req.body.flag}')`
            mydb.query(newsql, function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.json(results)
            })
        }


    })
})

app.post("/login", function (req, res) {
    var sql = "select * from user where account='" + req.body.account + "'";
    mydb.query(sql, function (err, results) {

        if (results.account == req.body.account && results.passwd == req.body.password && results.flag == req.body.flag) {
            res.json({
                msg: "登录成功",
                data: results
            });
            console.log(results);
        }
    })
})


app.get('/', (req, res) => {
    res.send('Hello World!');
});
//不用子路由,直接在/后面添路径


app.get("/getLunbo", (req, res) => {
    let sql = "select * from goodstype where 1";
    mydb.query(sql, (err, results) => {
        // console.log(results)
        res.json(results);
    })
})

app.post("/getImgs", (req, res) => {
    let sql = "select * from goods where 1 ";
    console.log(req.body)
    if (req.body.params.type != undefined) {
        sql += "and typeid=" + req.body.params.type
    }

    if (req.body.params.kw) {
        sql += " and name like '" + req.body.params.kw + "'"
    }
    mydb.query(sql, (err, results) => {
        // console.log(results)
        if (err) {
            console.log("数据请求错误!")
            return;
        }
        res.json(results);
    })

    // console.log(req.body.params.type)

})
app.post("/select", (req, res) => {
    // console.log(req.body.params.goods,777)
    if (typeof (req.body.params.goods) == "object") {
        // console.log(7777)
        for (var i = 0; i < req.body.params.goods.length; i++) {
            console.log(req.body.params.goods[i].name);
            let sql = "select * from goods where name='" + req.body.params.goods[i].name + "'";
            mydb.query(sql, (err, results) => {
                console.log(results, 666);
                res.json(results);
            })
        }
    }


})


app.get("/goods", (req, res) => {
    console.log(req.query)

    if (req.query.kw) {
        let sql = "select * from goods where 1 and name like '%" + req.query.kw + "%'"
        mydb.query(sql, (err, results) => {
            console.log(results);
            res.json(results);
        })
    } else {
        res.json([])
    }


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
app.use('/IMG', express.static(__dirname + '/IMG'));




app.post('/getmyorder',function(req,res){
    let sql = `select * from myoder where 1 `;
    mydb.query(sql,(err,results)=>{
        if(err){
            console.log(err);
            return;
        } else {
            console.log(results);
            res.json(results);
        }
    })
})


app.post('/getdetail', function (req, res) {
    let sql = `select * from goods where gid='${req.body.gid}'`;
    mydb.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(results[0]);
            res.json(results[0]);
        }
    })
})



app.post('/insertorder',function(req,res){
    console.log(req.body.totalPrice);
    let sql = `INSERT INTO myoder (name,paynumber,userid,totalprice,state) VALUES ('${req.body.name}','${req.body.number}','12','${req.body.totalPrice}','1')`;
    mydb.query(sql,(err,results)=>{
        if(err){
            console.log(err);
            return;
        }else{
            console.log(results[0]);
            res.json(results[0]);
        }
    })
})



app.post('/addcar',function(req,res){
    console.log(req.body.gid);
    let sql = `select * from mycar where gid = '${req.body.gid}'`;
    mydb.query(sql,(err,results)=>{
        if(err){
            console.log(err);
            return;
        }
        if(results.length>0){
            let ssql =`update mycar set number=${results[0].number}+'${req.body.number}' where gid = '${req.body.gid}'`;
            mydb.query(ssql,function(err,results){
				if(err){
					console.log(err);
					return;
				}
				res.json(results)
			})
		}else{
			let newsql = `insert into mycar (userid,gid,number) values('73','${req.body.gid}','${req.body.number}')`;
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


app.post('/getmycar', function (req, res) {
    console.log(req.body.gid);
    let sql = `select g.name, g.img, g.price,m.number from goods as g ,mycar as m where g.gid=m.gid `;
    mydb.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(results);
            res.json(results);
        }
    })
})

app.post('/updatamycar',function(req,res){
    console.log(req.body.gid);
    let sql = `delete  from mycar where gid='${req.body.gid}'`;
    mydb.query(sql,(err,results)=>{
        if(err){
            console.log(err);
            return;
        }else{
            console.log(results);
            res.json(results);
        }
    })
})



app.listen(8081, () => {
    console.log('Example app listening on port 8081!');


});