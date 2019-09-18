const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// 跨域处理
app.use(require('./Tools/cors').cors);
//parse content-type   application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//content-type   application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 启用子路由-用户模块
app.use('/user', require('./Controller/UserController'));
app.use('/cate', require('./Controller/CateController'));

app.listen(81, () => {
    console.log('Example app listening on port 81!');
});
