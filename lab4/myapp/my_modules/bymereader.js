var fs = require('fs');

module.exports = function(csv){
    var res = fs.readFileSync(csv);
    var new_arr = res.toString().split('\n');
    for(var i=0;i<new_arr.length;i++){
        new_arr[i] = new_arr[i].split(',');
    }
    return new_arr;
}