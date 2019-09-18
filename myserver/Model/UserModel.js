// 既然要对数据库的数据进行，必须要连接到数据库 
const DbBase  = require('./DbBase');
class UserModel extends DbBase{
    constructor(){
        super();
        this.table = 'inserts';
    }

    registerUser(userinfo, callback){
        let fieldstr ='',  field = '';
        let data = [];
        let isFirst = true;
        for (const f in userinfo) {
            if (userinfo.hasOwnProperty(f)) {
                fieldstr += (isFirst ? '':', ') + f;    //组装字段  也可以组装成数组 最后JOIN
                field += (isFirst ? '':', ') + '?';         //组装字段
                data.push(userinfo[f]);                 //组装字段对应的值
            }
            isFirst = false;
        }
        let sql = `INSERT INTO ${this.table}(${fieldstr}) VALUES (${field}) `;
        // sql = 'insert into users(email, username, tel) values (?,?,?)';
        this.mydb.query(sql, data, (err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                callback(results);
            }
            this.mydb.end();
        });
    }

    getUserByUsername(username, callback){
        let sql = `SELECT * FROM ${this.table} WHERE username = ? LIMIt 1`;
        this.mydb.query(sql, [username], (err, results)=>{
            if(err) {
                console.log(err);
                callback(err);
            }else{
                callback(results);
            }
            this.mydb.end();
        });
    }

}

module.exports = UserModel;