(function () {

function assert(con, mes) {
    if (!con) {
        throw new Error(mes);
    }
}

function Connection(outputNeuron, inputNeuron) {
    this.deltaWeight = 0;
    this.inputNeuron = inputNeuron;
    this.outputNeuron = outputNeuron;
    this.weight = Math.random()>=0.5 ? Math.random() : 0-Math.random(); // for now
}

Connection.prototype = {
    toJSON: function () {
        return {
            deltaWeight: this.deltaWeight,
            weight: this.weight,
        };
    },
};


function Neuron() {
    this._inputs = [];
    this._outputs = [];
    this.outputVal = 1;
    this.gradient = 0;
}

Neuron.prototype = {
    toJSON: function () {
        return {
            _inputs: this._inputs,
            gradient: this.gradient,
            outputVal: this.outputVal,
        };
    },
    eta: 0.15,  // [0..1] net training rate
    alpha: 0.5, // [0..n] multiplier of last weight change (momentum)

    addInput: function addInput(inputNeuron) {
        assert(inputNeuron instanceof Neuron, 'bad type inputNeuron.');

        var conection = new Connection(this, inputNeuron);

        this._inputs.push(conection);

        inputNeuron._outputs.push(conection);
    },

    update: function update() {
        var sum = 0;
        var inputs = this._inputs;

        for (var i = inputs.length - 1; i >= 0; i--) {
            sum += (inputs[i].weight * inputs[i].inputNeuron.outputVal);
        }

        // fancy function
        sum = this.transform(sum);

        this.outputVal = sum;
    },
    // updateBack: function updateBack() {
    //     var sum = 0;
    //     var inputs = this._outputs;

    //     for (var i = inputs.length - 1; i >= 0; i--) {
    //         sum += (1/inputs[i].weight * inputs[i].inputNeuron.outputVal);
    //     }

    //     // fancy function
    //     sum = this.transform(sum);

    //     this.outputVal = sum;
    // },

    transform: function transform(x) {
        return Math.tanh(x);
    },

    transformD: function transformD(x) {
        return 1 - x * x;
    },

    calcOutputGradient: function (x) {
        var detla = x - this.outputVal;
        this.gradient = detla * this.transformD(this.outputVal);
    },

    calcHiddenGradient: function () {
        var sum = 0;
        for (var i = this._outputs.length - 1; i >= 0; i--) {
            sum += this._outputs[i].weight * this._outputs[i].outputNeuron.gradient;
        }
        this.gradient = sum * this.transformD(this.outputVal);
    },

    updateInputWeights: function () {
        var inputs = this._inputs;
        for (var i = inputs.length - 1; i >= 0; i--) {
            var oldDeltaWeight = inputs[i].deltaWeight;
            var newDeltaWeight = this.eta *
                                 inputs[i].inputNeuron.outputVal *
                                 this.gradient +
                                 this.alpha *
                                 oldDeltaWeight;

            inputs[i].deltaWeight = newDeltaWeight;
            inputs[i].weight += newDeltaWeight;
        }
    }
};

function Net(netLayout /* [inputs, h1s, h2s,...hns, outputs] */) {
    this._netLayers = netLayers = [];
    this.error = 0;

    for (var i = 0; i < netLayout.length; i++) {
        var currentLayer = [];

        netLayers.push(currentLayer);

        for (var j = 0; j < netLayout[i] + 1; j++) {
            currentLayer.push(new Neuron());
        }
    }

    for (var i = netLayers.length - 1; i > 0; i--) {
        var currentLayer = netLayers[i];
        var previousLayer = netLayers[i - 1];

        for (var j = currentLayer.length - 1; j >= 0; j--) {
            for (var k = previousLayer.length - 1; k >= 0; k--) {
                currentLayer[j].addInput(previousLayer[k]);
            }
        }
    }
}

Net.from = function (data) {
    var n = [];
    for (var i = 0; i < data.length; i++) {
        n.push(data[i].length-1);
    }
    var net  = new Net(n);

    layers = net._netLayers;

    for (var i = data.length - 1; i >= 0; i--) {
        var netLayer = layers[i];
        var dataLayer = data[i];
        for (var j = dataLayer.length - 1; j >= 0; j--) {
            var dataNeuron = dataLayer[j];
            var netNeuron = netLayer[j];

            netNeuron.gradient = dataNeuron.gradient;
            netNeuron.outputVal = dataNeuron.outputVal;

            for (var k = dataNeuron._inputs.length - 1; k >= 0; k--) {
                var dataConnection = dataNeuron._inputs[k];
                var netConnection = netNeuron._inputs[k];

                netConnection.deltaWeight = dataConnection.deltaWeight;
                netConnection.weight = dataConnection.weight;
            }
        }
    }
    return net;
};

Net.prototype = {
    toJSON: function () {
        return this._netLayers;
    },
    feedForward: function feedForward(inputs) {
        var netLayers = this._netLayers;
        assert(inputs.length === netLayers[0].length - 1, 'bad input amount.');

        for (var i = inputs.length - 1; i >= 0; i--) {
            netLayers[0][i].outputVal = inputs[i];
        }

        for (var i = 1; i < netLayers.length; i++) {
            for (var j = 0; j < netLayers[i].length - 1; j++) {
                netLayers[i][j].update();
            }
        }

        var result = [];
        outputLayer = netLayers[netLayers.length - 1];

        for (var i = outputLayer.length - 2; i >= 0; i--) {
            result.push(outputLayer[i].outputVal)
        }
        return result;
    },
    // feedBackward: function feedBackward(inputs) {
    //     var netLayers = this._netLayers;
    //     assert(inputs.length === netLayers[netLayers.length - 1].length - 1, 'bad input amount.');

    //     for (var i = inputs.length - 1; i >= 0; i--) {
    //         netLayers[netLayers.length - 1][i].outputVal = inputs[i];
    //     }

    //     for (var i = netLayers.length - 2; i >= 0; i--) {
    //         for (var j = 0; j < netLayers[i].length - 1; j++) {
    //             netLayers[i][j].updateBack();
    //         }
    //     }

    //     var result = [];
    //     outputLayer = netLayers[0];

    //     for (var i = outputLayer.length - 2; i >= 0; i--) {
    //         result.push(outputLayer[i].outputVal)
    //     }
    //     return result;
    // },
    backPropigate: function backPropigate(expected) {
        var netLayers = this._netLayers;

        var outputLayer = netLayers[netLayers.length - 1];
        assert(expected.length === outputLayer.length - 1, 'bad input amount.');

        // calc overall error
        var error = 0;

        for (var i = outputLayer.length - 2; i >= 0; i--) {
            var detla = expected[i] - outputLayer[i].outputVal;
            error += detla * detla;
        }

        error /= expected.length;

        this.error = Math.sqrt(error);

        // calc output gradients

        for (var i = outputLayer.length - 2; i >= 0; i--) {
            outputLayer[i].calcOutputGradient(expected[i]);
        }

        // calc hidden gradients

        for (var i = netLayers.length - 1; i >= 0; i--) {

            for (var j = netLayers[i].length - 2; j > 0; j--) {
                netLayers[i][j].calcHiddenGradient();
            }
        }

        // update input weights

        for (var i = netLayers.length - 1; i >= 0; i--) {

            for (var j = netLayers[i].length - 1; j > 0; j--) {
                netLayers[i][j].updateInputWeights();
            }
        }
    }
};

module.exports = Net;
}())
