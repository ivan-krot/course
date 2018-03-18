var fs = require('fs');

module.exports = function(page){
    var res = fs.readFileSync(page);
    return res.toString();
}