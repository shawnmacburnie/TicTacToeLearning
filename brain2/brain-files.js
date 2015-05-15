var Net  = require('./net'),
    fs   = require('fs'),
    path = require('path'),

    brainCache = {};

exports.loadBrain = function loadBrain(brainId) {
    if (!brainCache[ brainId ]) {
        var file = path.resolve('./brains', brainId),
            brainFile = JSON.parse(fs.readFileSync(file));
        console.log('Loaded brain form file: '+ file);

        brainCache[ brainId ] = Net.fromJSON(brainFile);
    }

    return brainCache[ brainId ];
};

exports.saveBrain = function saveBrain(brainId, net) {
    var file = path.resolve('./brains', brainId);
    fs.WriteFileSync(file, JSON.stringify(net.toJSON()));
    delete brainCache[ brainId ];
};
