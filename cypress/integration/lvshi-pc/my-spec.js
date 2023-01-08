var fs = require("fs"); // module
var glob = require("glob");// helps to find file from globally using path
var path = require("path");

glob.sync(path.join(__dirname, "wap_reg_req.csv")).forEach(function(csv_filename) {
    if (!(/_new\.csv$/.test(csv_filename))) {
        fs.readFile(csv_filename, "utf8", function(err, data) {
            if (err){ // if there is some mistakes
                console.log(err)
            }else{
                let stringTotal="";
                var arrayEachLines = data.split("\n");
            /*  arrayEachLines.forEach(function(line){    
                stringTotal=stringTotal+line+"\n";
                                */
                var o={};

                var i;
                var row;
                for (i=0; i<arrayEachLines.length; i++){
                    o[i]=arrayEachLines[i];
                    o[i]=o[i].replace(o[row],"");
                }
                arrayEachLines.push(o);

                console.log(o);


                fs.writeFile(csv_filename.replace(/Excel\.csv_original/, "Excel.csv_updated").replace(/\.csv$/, "_new.csv"), o[i], "utf8", function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(csv_filename + " converted");
                    }
                });
            }

        });
}});


