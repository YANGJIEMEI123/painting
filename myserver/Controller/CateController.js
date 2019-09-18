const express = require('express');
const CateModel = require('../Model/CateModel');
const router = express.Router();

router.post('/create', (req, res) => {
    console.log(req.body);//object
    // 需要对数据进行操作  Model 
    let cateModel = new CateModel();

    cateModel.createCate(req.body, (results) => {
        console.log(results);
        if (results.insertId) {
            res.json({ code: 1, Msg: '添加成功' });
        } else {
            res.json({ code: -1, Msg: '添加失败，请重新操作' });
        }
    });
});

// 返回所有的一级分类
router.get('/getfcate', (req, res) => {
    // 需要对数据进行操作  Model 
    let cateModel = new CateModel();
    cateModel.getAllFatherCate((results) => {
        res.json(results);
    });
});

// 返回所有的分类
router.get('/getcate', (req, res) => {
    // 需要对数据进行操作  Model 
    let cateModel = new CateModel();
    let page = req.query.page ? req.query.page : 1;
    let limitnum = req.query.limit ? req.query.limit : 10;

    cateModel.getAllCate(page, limitnum,(results) => {
        let ob = { "code": 0, "msg": "", "count":11, "data": results }
        res.json(ob);
    });
});

router.post('/del', (req, res) => {
    // 需要对数据进行操作  Model 
    let cateModel = new CateModel();
    let cid = req.body.cid;
    cateModel.delCategory(cid,(results) => {
        res.json(results);
    });
});



router.post('/update', (req, res) => {
    console.log(req.body);//object
    // 需要对数据进行操作  Model 
    let cateModel = new CateModel();

    cateModel.updateCate(req.body, (results) => {
        console.log(results);
        if (results.affectedRows) {
            res.json({ code: 1, Msg: '更新成功' });
        } else {
            res.json({ code: -1, Msg: '更新失败，请重新操作' });
        }
    });
});


router.get('/getinfo', (req, res) => {
    // 需要对数据进行操作  Model 
    let cateModel = new CateModel();
    let cid = req.query.cid;
    cateModel.getbackinfo(cid,(results) => {
        res.json(results);
    });
});



router.post('/book', (req, res) => {
    console.log(req.body);//object
    // 需要对数据进行操作  Model 
    let cateModel = new CateModel();

    cateModel.createbook(req.body, (results) => {
        console.log(results);
        if (results.insertId) {
            res.json({ code: 1, Msg: '添加书籍成功' });
        } else {
            res.json({ code: -1, Msg: '添加书籍失败，请重新操作' });
        }
    });
});
module.exports = router;