var fs = require('fs');
var os = require('os');

module.exports = function(req,file){
    var log_date = new Date() + '\n';
    //response info
    var log_info = log_date + 
    "url: " + req.url + os.EOL + 
    "req method: " + req.method + os.EOL +
    "user agent: " + req.headers["user-agent"] + os.EOL + 
    "all headers:" + req.rawHeaders + os.EOL +
    "User info:"+os.EOL+
    "- OS:"+os.type()+os.EOL+
    "- machine:"+os.hostname()+os.EOL+os.EOL;
    
    fs.appendFile(file, log_info, function (err) {
        if (err) throw err;
        console.log('Logfile was update.');
    });
}