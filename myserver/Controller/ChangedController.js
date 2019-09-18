const express = require('express');
const ChangedModel = require('../Model/ChangedModel');
const router = express.Router();

router.post('/getClass', (req, res)=>{
    console.log(req.body);//object
    // 需要对数据进行操作  Model 
    let changedModel  = new ChangedModel();
    // 对数据进行处理 passwd1
    // delete req.body.passwd1;
    // req.body.regtimes = new Date().toLocaleString();

    changedModel.getClassbyid(req.body, (results)=>{
        console.log(results);
        if(results.insertId){
            res.json({code:1, Msg:'注册成功'});
        }else{
            res.json({code:-1, Msg:'注册失败，请重新操作'});
        }
    });
});