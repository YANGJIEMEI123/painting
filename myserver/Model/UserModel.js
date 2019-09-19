// 既然要对数据库的数据进行，必须要连接到数据库 
const DbBase = require('./DbBase');
class UserModel extends DbBase {
    constructor() {
        super();
        this.table = 'user';
    }

    registerUser(userinfo, callback) {
        var sql = "select * from user where account='" + req.body.account + "'";
        mydb.query(sql, function (err, results) {
            if (results.length > 0) {
                res.json({ msg: "username_has_exited" })
            } else {
                let newsql = `insert into user(account,password,nickname) values('${req.body.account}','${req.body.password}','${req.body.nickname}')`
                mydb.query(newsql, function (err, results) {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        callback(results);
                    }

                })
            }
        })
    }

    getUserByUsername(username, callback) {
        let sql = `SELECT * FROM ${this.table} WHERE username = ? LIMIt 1`;
        this.mydb.query(sql, [username], (err, results) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(results);
            }
            this.mydb.end();
        });
    }

}

module.exports = UserModel;