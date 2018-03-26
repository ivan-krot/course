var fs = require('fs');

module.exports = function(page){
    var res = fs.readFileSync(page);
    var new_arr = res.toString().split('\n');
    return new_arr;
}