const DbBase  = require('./DbBase');
class ChangedModel extends DbBase{
    constructor(){
        super();
        this.table ='goods';
    }

   getClassbyid(typeid, callback){
        let sql = `SELECT * FROM ${this.table} WHERE typeid = ? LIMIt 1`;
        this.mydb.query(sql, [typeid], (err, results)=>{
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
module.exports = ChangedModel;