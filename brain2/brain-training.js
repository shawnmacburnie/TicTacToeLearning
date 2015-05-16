var Net = require('./net'),
    brainFiles = require('./brain-files'),
    fs = require('fs');


function expandSamples(arr) {
    var arrB = [
        0,0, 0,0, 0,0,
        0,0, 0,0, 0,0,
        0,0, 0,0, 0,0
    ];
    for (var i = 0, j = 0; i < arr.length-1; i++, j+=2) {
        if (arr[i] === 1) {
            arrB[j] = 1;
        } else if (arr[i] === -1) {
            arrB[j + 1] = 1;
        }
    }
    return arrB;
}

var data = fs.readFileSync('./data.txt', 'utf8').split('\n');
var trainingSet = [];
for (var i = 0; i < data.length;i++) {
    if (data[i][0] === '#') continue;
    var line = data[i].split(',');
    if (line.length !== 18) continue;
    for (var x = 0; x < line.length;x++) {
        line[x] = parseInt(line[x]);
    }
    var input = line.splice(0,9);
    trainingSet.push({input: /*expandSamples(*/input/*)*/, output: line});
}

var net = Net(9,48,9);

var trainer = new Net.Trainer(net);

trainer.train(trainingSet);

brainFiles.saveBrain('1', net);

