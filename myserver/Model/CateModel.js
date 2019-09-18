// 既然要对数据库的数据进行，必须要连接到数据库 
const DbBase  = require('./DbBase');
class CateModel extends DbBase{
    constructor(){
        super();
        this.table = 'category';
    }

    getAllFatherCate(callback){
        let sql = `SELECT * FROM  ${this.table} WHERE fid = 0`;
        this.mydb.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                callback(results);
            }
            this.mydb.end();
        });
    }

    getAllCate(page, limitnum, callback){
        // let countsql = `select count(*) as numbs from ${this.table} WHERE 1;`;
        let sql = `SELECT * FROM  ${this.table} WHERE 1 LIMIT ${(page-1)*limitnum}, ${limitnum}`;
        this.mydb.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                console.log(results);
                callback(results);
            }
            this.mydb.end();
        });
    }

    createCate(cateinfo, callback){
        let fieldstr ='',  field = '';
        let data = [];
        let isFirst = true;
        for (const f in cateinfo) {
            if (cateinfo.hasOwnProperty(f)) {
                fieldstr += (isFirst ? '':', ') + f;    //组装字段  也可以组装成数组 最后JOIN
                field += (isFirst ? '':', ') + '?';         //组装字段
                data.push(cateinfo[f]);                 //组装字段对应的值
            }
            isFirst = false;
        }
        let sql = `INSERT INTO ${this.table}(${fieldstr}) VALUES (${field}) `;
        this.mydb.query(sql, data, (err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                console.log(results);
                callback(results);
            }
            this.mydb.end();
        });
    }
    delCategory(cid,callback){
        let sql = `delete  FROM  ${this.table} WHERE cid = ?`;
        this.mydb.query(sql,[cid], (err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                callback(results);
            }
            this.mydb.end();
        });
    }

    getbackinfo(cid,callback){
        let sql = `SELECT * FROM  ${this.table} WHERE cid = ?`;
        this.mydb.query(sql,[cid],(err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                callback(results);
            }
            this.mydb.end();
        });
    }



    updateCate(cateinfo, callback){
        let sql = `update  ${this.table} set name =? , fid=? where cid=? `;
        let data = [cateinfo.name,cateinfo.fid,cateinfo.cid]
        this.mydb.query(sql,data, (err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                console.log(results);
                callback(results);
            }
            this.mydb.end();
        });
    }


    
    createbook(cateinfo, callback){
        let fieldstr ='',  field = '';
        let data = [];
        let isFirst = true;
        for (const f in cateinfo) {
            if (cateinfo.hasOwnProperty(f)) {
                fieldstr += (isFirst ? '':', ') + f;    //组装字段  也可以组装成数组 最后JOIN
                field += (isFirst ? '':', ') + '?';         //组装字段
                data.push(cateinfo[f]);                 //组装字段对应的值
            }
            isFirst = false;
        }
        let sql = `INSERT INTO books(${fieldstr}) VALUES (${field}) `;
        this.mydb.query(sql, data, (err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                console.log(results);
                callback(results);
            }
            this.mydb.end();
        });
    }

}



module.exports = CateModel;