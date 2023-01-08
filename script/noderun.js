// /**
//  * 没有使用
//  */

// //var result=require('./myDb');
// const cypress = require('cypress')
// //console.log(result)
// let caseids 
// let result ={}
// // Require Cypress

// // Get command line arguments
// const argv = process.argv.slice(2)
// console.log(argv[0])
// caseids = argv[0]
// // Determine the device type
// const device = argv.includes('--b4')
//     ? 'iphoneX'
//     : argv.includes('--b5')
//     ? 'xiaoMi8'
//     : argv.includes('--b101')
//     ? 'androidMobileQB'
//     : argv.includes('--b102')
//     ? 'iOSMobileQB'
//     : argv.includes('--b103')
//     ? 'androidMobileSgApp'
//     : argv.includes('--b104')
//     ? 'iOSMobileSgAPP'
//     : argv.includes('--b105')
//     ? 'androidMobileUC'
//     : argv.includes('--b106')
//     ? 'iOSMobileUC'
//     : 'desktop'
// const cypressOptions = {
//     projectId: '4gmeot',
//     browser: 'chrome',
//     record: true,
//     key: '4380403d-694d-4741-9e3b-912447748bbb',
//     headless: true,
//     // Expose the device type as Cypress environment variables
//     env: {
//         second_case_id: caseids,
//         isIphoneX: device === 'iphoneX',
//         isXiaoMi8: device === 'xiaoMi8',
//         isAndroidMobileQB: device === 'androidMobileQB',
//         isIOSMobileQB : device === 'iOSMobileQB',
//         isAndroidMobileSgApp : device === 'androidMobileSgApp',
//         isIOSMobileSgAPP : device === 'iOSMobileSgAPP',
//         isAndroidMobileUC : device === 'androidMobileUC',
//         isIOSMobileUC : device === 'iOSMobileUC',
//     },
//     config: {
//         // Mobile: emulate iPhone 5
//         ...(device === 'iphoneX' && {
//             userAgent:
//                 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 Mobile/15B202 Safari/604.1',
//             viewportWidth: 375,
//             viewportHeight: 812
//         }),
//         // Tablet: emulate iPad in landscape mode
//         ...(device === 'xiaoMi8' && {
//             userAgent:
//                 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; MI 8 Build/OPM1.171019.026) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/9.2 Mobile Safari/537.36',
//             viewportWidth: 360,
//             viewportHeight: 640
//         }),
//         // Desktop: use default browser user agent
//         ...(device === 'androidMobileQB' && {
//             userAgent:
//                 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; vivo X21A Build/OPM1.171019.011) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/9.9 Mobile Safari/537.3',
         
//             viewportWidth: 360,
//             viewportHeight: 640
//         }),
//         ...(device === 'iOSMobileQB' && {
//             userAgent:
//                 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 MQQBrowser/9.9.0 Mobile/15B202 Safari/604.1 QBWebViewUA/2 QBWebViewType/1 WKType/1',
         
//             viewportWidth: 360,
//             viewportHeight: 640
//         }),
//         ...(device === 'androidMobileSgApp' && {
//             userAgent:
//                 'Mozilla/5.0 (Linux; Android 8.1.0; vivo X21A Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) S3 Version/4.0 Chrome/72.0.3626.121 Mobile Safari/537.36 SGInfo/1080/2280/3.0 SogouSearch Android1.0 version3.0 AppVersion/7301 NoHead',
         
//             viewportWidth: 360,
//             viewportHeight: 640
//         }),
//         ...(device === 'iOSMobileSgAPP' && {
//             userAgent:
//                 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B202 SGInfo/1125/2436/3 Sogousearch/Ios/7.3.0 NoHead',
         
//             viewportWidth: 360,
//             viewportHeight: 640
//         }),
//         ...(device === 'androidMobileUC' && {
//             userAgent:
//                 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-CN; vivo X21A Build/OPM1.171019.011) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.7.6.1056 Mobile Safari/537.36',
         
//             viewportWidth: 360,
//             viewportHeight: 640
//         }),
//         ...(device === 'iOSMobileUC' && {
//             userAgent:
//                 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/15B202 UCBrowser/12.7.6.1251 Mobile  AliApp(TUnionSDK/0.1.20.3)',
         
//             viewportWidth: 360,
//             viewportHeight: 640
//         })
//     },

// }


// function runCypress() {         
//         if (argv.includes('--open')) {
//                 return cypress.open(cypressOptions)
//         }
//         return cypress.run(cypressOptions)
        
    
// }
// runCypress()
//     .then(results => {
//         if (results.totalFailed >= 0 || results.failures >= 0) {
//             // Make sure to exit with an error code if tests failed
//             console.log(results.totalFailed)
//             result["run"] = false
//             result["url"] = results.runUrl
          
//         }
//         else{
//             result["run"] = true
//             result["url"] = results.runUrl
//         }
//         console.log(result)
//         process.exit(1)
//     })
//     .catch(err => {
//         console.error(err.stack || err)
//         process.exit(1)
//     })



var fun = function(){
    var execFile = require('child_process').execFile;
    var str = "tttt";
    let optionsBin = './txSendMsg  "p_sgwxwang" "p_sgwxwang" "'+ str + '" 0'
    execFile(optionsBin , function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });  
}
fun();