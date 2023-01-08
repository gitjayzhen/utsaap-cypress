//导入express框架
const express = require("express");
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const cypress = require('cypress')
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

/**数据库配置 */
const option={
  host:"10.*.*.*",
  user:"root",
  password:"123456ws",
  database:"DriverAuto",
  connectTimeout:5000,
}


function setCypressConfig(device){
    return{
        browser: 'chrome',
        record: false,
        projectId: 'r4eyq4',
        headless: false,
        key: '65c8007c-cbc4-411a-a0e2-918ca168b1dc',
        reporter:'./cypress/reports/custom_reporter.js',
        // Expose the device type as Cypress environment variables
        env: {
            isIphoneX: device === 'iphoneX',
            isXiaoMi8: device === 'xiaoMi8',
            isAndroidMobileQB: device === 'androidMobileQB',
            isIOSMobileQB : device === 'iOSMobileQB',
            isAndroidMobileSgApp : device === 'androidMobileSgApp',
            isIOSMobileSgAPP : device === 'iOSMobileSgAPP',
            isAndroidMobileUC : device === 'androidMobileUC',
            isIOSMobileUC : device === 'iOSMobileUC',
        },
        config: {
            // Mobile: emulate iPhone 5
            ...(device === 'iphoneX' && {
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 Mobile/15B202 Safari/604.1',
                viewportWidth: 375,
                viewportHeight: 812
            }),
            // Tablet: emulate iPad in landscape mode
            ...(device === 'xiaoMi8' && {
                userAgent:
                    'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; MI 8 Build/OPM1.171019.026) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/9.2 Mobile Safari/537.36',
                viewportWidth: 360,
                viewportHeight: 640
            }),
            // Desktop: use default browser user agent
            ...(device === 'androidMobileQB' && {
                userAgent:
                    'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; vivo X21A Build/OPM1.171019.011) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/9.9 Mobile Safari/537.3',
            
                viewportWidth: 360,
                viewportHeight: 640
            }),
            ...(device === 'iOSMobileQB' && {
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 MQQBrowser/9.9.0 Mobile/15B202 Safari/604.1 QBWebViewUA/2 QBWebViewType/1 WKType/1',
            
                viewportWidth: 360,
                viewportHeight: 640
            }),
            ...(device === 'androidMobileSgApp' && {
                userAgent:
                    'Mozilla/5.0 (Linux; Android 8.1.0; vivo X21A Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) S3 Version/4.0 Chrome/72.0.3626.121 Mobile Safari/537.36 SGInfo/1080/2280/3.0 SogouSearch Android1.0 version3.0 AppVersion/7301 NoHead',
            
                viewportWidth: 360,
                viewportHeight: 640
            }),
            ...(device === 'iOSMobileSgAPP' && {
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B202 SGInfo/1125/2436/3 Sogousearch/Ios/7.3.0 NoHead',
            
                viewportWidth: 360,
                viewportHeight: 640
            }),
            ...(device === 'androidMobileUC' && {
                userAgent:
                    'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-CN; vivo X21A Build/OPM1.171019.011) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.7.6.1056 Mobile Safari/537.36',
            
                viewportWidth: 360,
                viewportHeight: 640
            }),
            ...(device === 'iOSMobileUC' && {
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/15B202 UCBrowser/12.7.6.1251 Mobile  AliApp(TUnionSDK/0.1.20.3)',
            
                viewportWidth: 360,
                viewportHeight: 640
            })
        },
    
    }
}

/**
 * 微信告警
 * errorid 执行失败的case id
 */
function sendWarn(errorid){    
    var exec = require('child_process').exec;
    let str = "【cypress】告警： caseid " + errorid + " 执行失败";
    let optionsBin = './txSendMsg  "p_sgwxwang" "p_sgwxwang" "'+ str + '" 0'
    exec(optionsBin , function(err, data){
         console.log(data.toString());
     });
}


function Result({code={},msg='',data={}}){
    this.code = code;
    this.msg = msg;
    this.data =data;
}
/**
 * 执行成功更新结果
 * @param {*} caseid caseid
 * @param {*} caselogid sublogid 任务id
 */
function updateResult(caseid, caselogid){
    try{
        const conn1 = mysql.createConnection(option)
        let sql = 'update autocaselog set runstatus = 0 ,loginfos="cypress测试通过" where sublogid = ? and caseid = ?'
        let data = [caselogid,caseid] 

        conn1.query(sql,data,(error,results,fileds) =>{
            if(error){
                console.log(error.message);
            }else{
                console.log("Rows affected",results.affectedRows);
            }
        });
        conn1.end()
    }catch(err){
        console.log("update sql err caseid&caselogid: "+ caseid + "," + caselogid)
    }
}


app.all("/cysec", function(req, res, next) {
   const conn = mysql.createConnection(option);
   var sqlquery = "SELECT * FROM caseinfo WHERE id=" + req.query.caseid;
   var sqlquery1 = "select description from projecttype where id = (select projectid from casedir where id = (select dirid from caseinfo where id = " + req.query.caseid  +")) "
   let device;
   conn.query(sqlquery,(e,r)=>{
       conn.query(sqlquery1,(err2,r2)=>{
        try{
            if(r.length > 0){
                  device = r[0].browsertype === 4
                  ? 'iphoneX'
                  : r[0].browsertype === 5
                  ? 'xiaoMi8'
                  : r[0].browsertype === 101
                  ? 'androidMobileQB'
                  : r[0].browsertype === 102
                  ? 'iOSMobileQB'
                  : r[0].browsertype === 103
                  ? 'androidMobileSgApp'
                  : r[0].browsertype === 104
                  ? 'iOSMobileSgAPP'
                  : r[0].browsertype === 105
                  ? 'androidMobileUC'
                  : r[0].browsertype === 106
                  ? 'iOSMobileUC'
                  : 'desktop'
            
              cypressOptions = setCypressConfig(device)
              cypressOptions.env.second_case_id = req.query.caseid
              cypressOptions.env.second_case_name = r[0].casename 
              cypressOptions.env.browsertype = device
              cypressOptions.env.projectName = r2[0].description
              res.json(new Result({code:200}))
              cypress.run(cypressOptions).then(results => {
                    if (results.totalFailed > 0 || results.failures > 0) {
                        // Make sure to exit with an error code if tests failed
                        //   sendWarn(r[0].id)
                        let id = r[0].id
                        console.error(`run case error ${id}`)
                    }else{
                        updateResult(req.query.caseid, req.query.caselogid)
                    }
              }).catch(err =>{
                  console.error(err.stack || err)
              })
            }//if
            else{
              res.json(new Result({code:-1,msg:"参数传递错误caseid=&caselogid=或执行异常"}))
            }
        }catch(err){
          res.json(new Result({code:-2,msg:"参数传递错误caseid=&caselogid=或执行异常"}))
          console.log(err);
       }
    });
    conn.end()
   });
})



var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("服务器启动成功了端口是", port);
})
