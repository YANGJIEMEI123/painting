const express = require('express');
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
//parse content-type   application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
//content-type   application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/IMG', express.static(__dirname + '/IMG'));

app.get("/getOli", (req, res) => {
    let sql = "select * from goods where 1";
    console.log(sql)
    mydb.query(sql, (err, results) => {
        console.log(results)
        res.json(results);
    })
});
app.get("/lunbo", (req, res) => {
    let sql = "select * from goodstype where 1";
    console.log(sql)
    mydb.query(sql, (err, results) => {
        console.log(results)
        res.json(results);
    })
})
app.listen(8081, () => {
    console.log("app has started on 8081!")
})