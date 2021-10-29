const fs = require('fs');
const readline = require('readline');

// Creating readable strem
const file = readline.createInterface({
	input: fs.createReadStream('test.txt'),
	output: process.stdout,
	terminal: false
});

let total = 0

file.on('line', (line) => {
	let values = line.split(",")

    if(!isNaN(values[2])) {
        total += Number(values[2])
    }
});

file.on('close', function() {
    console.log(total)
})
