var synaptic  = require('synaptic'),

    Neuron    = synaptic.Neuron,
    Layer     = synaptic.Layer,
    Network   = synaptic.Network,
    Trainer   = synaptic.Trainer,
    Architect = synaptic.Architect;

function Net() {
    var setup = Array.prototype.slice.call(arguments);
    if (setup.length < 3) {
        throw new Error('setup must be a minimum of 3 layers.');
    }

    var inputLayer   = new Layer(setup.slice(0,1)[0]);
    var outputLayer  = new Layer(setup.slice(-1)[0]);
    var hiddenLayers = setup.slice(1, -1);

    var previousLayer = inputLayer;
    for (var i = 0; i < hiddenLayers.length; i++) {
        hiddenLayers[i] = new Layer(hiddenLayers[i]);

        previousLayer.project(hiddenLayers[i]);
        previousLayer = hiddenLayers[i];
    }

    previousLayer.project(outputLayer);

    var network = new Network({
        input: inputLayer,
        hidden: hiddenLayers,
        output: outputLayer
    });

    return network;
};

Net.fromJSON = function fromJSON(data) {
    return Network.fromJSON(data);
};

Net.Trainer = Trainer;

module.exports = Net;
