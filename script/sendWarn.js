

var exec = require('child_process');
const argv = process.argv.slice(2)
console.log(argv[0])


var fun =function(str){
    console.log("fun() start");

    let optionsBin = 'call txSendMsg'
    exec.execFile(optionsBin , function(err, data){
         console.log(err)
         console.log(data.toString());
     });
 }
 fun(argv[0]);
