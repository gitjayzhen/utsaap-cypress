///<reference types="cypress" />

var uts = require('../config/support/index.js')

let caseids = []
let casedesc = {}
casedesc["id"] = Cypress.env('second_case_id')
casedesc["name"] = Cypress.env('second_case_name')
casedesc["browsertype"] = Cypress.env('browsertype')
casedesc["projectName"] = Cypress.env('projectName')
caseids.push(Cypress.env('second_case_id'))
let caseinfo;
//接口2149,
//新开页面1135
//跨域问题 1649,1650,
//url页面打不开,1539,1547,1548,1549,1550,1551,1552,1553,1554，2000,662,
//871无法点击，782 无法解决 780总是崩溃
//query是object 1004,1005,1002,1002
//锟斤拷1047,658,660
//第三方跳转或者原因是加了代理 proxy1263,1270,1272,1273,1275,1278,1279,1280,1285,2311,2313,2312,2314,2315，12501364,1366,1174,1291,
//,450,1031,1251,1289,1290,1003,
//这个都是模拟ua无法点击877,281,1931,1932,1933,1934,1935,1936,1937,1938, 242,245,280,664,718,664,718,1983,1984,668,1928,1929,1930,91,92,52,50,53,458,257,57,60,61,171,72,73,250,91
//问问测试环境,190
//657,661 可见失败
//932 SELECT

//1656 中文乱码 978 a标签点击 安全1635
//新开页面720,1844,1869,1992,2101,1848,436,943,1619
//wap1633,1887

for(let j=0;j<caseids.length;j++){
    //提供一个接口 接口获得 uts 的id 
    describe('二次验证', () => {
        before(() => {       
            var query = 'select * from caseinfo where id= ' + caseids[j]//77js_click 有问题 1919 exe_js 1620 get_title 943 verstr_isnoequals  1261 refresh 694 send_keys 232 get_text switch_to_window 258 mouse_over 1840 get_cookies 1848 后退
            cy.task('queryDb',query).then( //闭包赋值
                ($data) => {
                    caseinfo = $data[0]  //数据库读取case信息
                }, 
                function(reason, data){
                    console.log('rejected');
                    console.log(reason);
                })
            // cy.on("url:changed", (newUrl) => {
            //         console.log(newUrl)
            //         cy.openTab(newUrl,{tab_name: 'myNewTab'})
            //     })
        
        })//beforEach
    
        it(`用例信息：项目 - ${casedesc['projectName']} - 用例id:${casedesc['id']} - 用例名:${casedesc['name']} - 浏览器:${casedesc['browsertype']}`, function(){  
            
            var casestep = JSON.parse(caseinfo['casestep'])

            cy.log(Cypress.config('pageLoadTimeout'))
            uts['split_case'](caseinfo,casestep,0)
            cy.closeAllTabs()
        })//测试开始

        
    })//describe

}//for

