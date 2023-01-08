const mysql = require('mysql')
const moment= require('moment')
var mocha = require('mocha');

/**数据库配置 */
const option={
    host:"10.*.*.*",
    user:"root",
    password:"123456ws",
    database:"DriverAuto",
    connectTimeout:5000,
  }


function updateResult(title, is_success, err_type, err_desc){
    try{
         const conn1 = mysql.createConnection(option)
         let sql,data;
         dt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
         if(is_success === 1){ //成功
             sql = 'insert into cypress_dashboard(name,is_success,date) values(?,?,?)'
             data = [title,is_success,dt] 
         }
         else{ //失败
            sql = 'insert into cypress_dashboard(name,is_success,err_type,err_desc,date) values(?,?,?,?,?)'
            data = [title,is_success,err_type,err_desc,dt] 
         }
         conn1.query(sql,data,(error,results,fileds) =>{
             if(error){
                 console.log(error.message);
             }else{
                 console.log("Rows affected",results.affectedRows);
             }
         });
         conn1.end()
        }catch{
            console.log("update sql err title :" + title)
        }
}


function MyReporter(runner) {
    mocha.reporters.Base.call(this, runner)
    var passes = 0
    var failures = 0
    runner.on('pass', function (test) {
        passes++
        updateResult(test.fullTitle(),1,"","")
        
    })

    runner.on('fail', function (test, err) {
        failures++
        updateResult(test.fullTitle(),0,err.name,err.message)
    })  
}
module.exports = MyReporter;