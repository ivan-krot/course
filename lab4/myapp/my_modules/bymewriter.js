var fs = require('fs');

module.exports = function(data,file){
    var user_data = data; 
    
    fs.appendFile(file, user_data, function (err) {
        if (err) throw err;
    });
}