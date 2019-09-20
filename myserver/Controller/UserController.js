const express = require('express');
const UserModel = require('../Model/UserModel');
const router = express.Router();

router.post('/reg', (req, res)=>{
    console.log(req.body);//object
    // 需要对数据进行操作  Model 
    let userModel  = new UserModel();
    // 对数据进行处理 passwd1
   
    // req.body.regtimes = new Date().toLocaleString();

    userModel.registerUser(req.body, (results)=>{
        console.log(results);
        if(results.insertId){
            res.json({code:1, Msg:'注册成功'});
        }else{
            res.json({code:-1, Msg:'注册失败，请重新操作'});
        }
    });
});

router.post('/login', (req, res)=>{
    let userModel  = new UserModel();
    let username = req.body.username;
    let passwd = req.body.passwd;

    userModel.getUserByUsername(username, (results)=>{
            let ob = {
                code:1,
                Msg:'登录成功'
            };
            if(results.length == 0){
                ob = {
                    code:-1,
                    Msg:'用户不存在'
                };
            }else if(results[0].passwd != passwd){
                ob = {
                    code:0,
                    Msg:'密码错误'
                };
            }
            res.json(ob);
    });
});

module.exports = router;
