const readlineSync = require('readline-sync');

// const name_main = readlineSync.question('What is your name, Mister_X?');
// const name_player = readlineSync.question('What is your name, Player?');

const name_main = 'MisterX';
const name_player = 'Catcher';

console.log('Hello, '+name_main+', and player '+name_player+'. ');
do{
	var num = readlineSync.question(name_main+', enter any 3-digit number, which contains only unique digits:');
} while(!check_unique(num));

//console.clear();

const numByMain = num;
var game_difficult = numByMain.length;

console.log('And now, dear '+name_player+' You may try to catch secret number');
console.log('NOTE: Secret number is contain only '+game_difficult+' unique digits.');

var step = 0;
do{
	var numByPlayer = readlineSync.question('Enter Your number:');
	step++;
}
while(!check_number(numByMain,numByPlayer));

console.log('By '+step+(step>1 ? ' steps' : ' step')+'.');

function check_unique(u){
	for(var i=0;i<u.length;i++){
		for(var j=i+1;j<u.length;j++){
			if(u[i]==u[j]){
				return 0;
			}
		}
	}
	return 1;
}

function check_number(x,a) {
	var ox = 0;
	var cow = 0;
	var counter = 0;
	for(var i=0;i<x.length;i++){
		var last_catch = 0;
		if(x[i] == a[i]){
			ox++;
			last_catch = i;
			counter++;
		} else {
			for(var j = last_catch;j<x.length;j++){
				if (x[i] == a[j]) {
					cow++;
				}
			}
		}
	}
	if(counter == x.length){
		console.log('Your are WINNER! Secret number is: '+numByMain);
		return 1;
	} else{
		console.log(ox+'ox'+cow+'cow');
		return 0;
	}
}