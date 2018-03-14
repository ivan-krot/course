const readlineSync = require('readline-sync');

var height = readlineSync.question('Enter Your number:');

for (var i = 0; i < height; i++) {
	var str = '#';
	for(var j = 1; j<=i;j++){
		str+='#';
	}
	console.log(str);
}