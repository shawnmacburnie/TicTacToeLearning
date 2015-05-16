var Net  = require('./net'),
    fs   = require('fs'),
    path = require('path'),

    brainCache = {};

exports.loadBrain = function loadBrain(brainId) {
    // console.log('in');
    if (!brainCache[ brainId ]) {
        // console.log('no brain');

        var file = path.resolve('./brains', brainId),
            brainFile = fs.readFileSync(file, 'utf8');
        console.log('Loaded brain form file: '+ file);
        // console.log(JSON.parse(brainFile))
    // console.log('in b');

        brainCache[ brainId ] = Net.fromJSON(JSON.parse(brainFile));
    // console.log('in a');
    }

        // console.log('brain', brainCache[ brainId ]);

    return brainCache[ brainId ];
};

exports.saveBrain = function saveBrain(brainId, net) {
    var file = path.resolve('./brains', brainId);
    fs.writeFileSync(file, JSON.stringify(net.toJSON()));
    delete brainCache[ brainId ];
};
