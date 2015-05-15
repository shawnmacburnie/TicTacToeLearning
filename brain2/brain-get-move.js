Brain = require('./brain-files');

Array.prototype.scramble = function scramble() {
    var arr = [];
    var isEven = this.length % 2 === 0;

    for (var i = isEven ? 0 : 1, j = this.length - 1; i < j; i++, j--) {
        if (Math.random() > 0.5) {
            arr.push(this[i]);
            arr.push(this[j]);
        } else {
            arr.push(this[j]);
            arr.push(this[i]);
        }
    }

    if (!isEven) {
        arr.splice( parseInt(Math.random() * arr.length), 0, this[0] )
    }

    return arr;
};

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

function redunceSamples(arr) {
    var arrB = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];
    for (var i = 0, j = 0; i < arr.length-1; i++, j+=2) {
        arrB[ i ] = arr[ j ] - arr[ j + 1 ];
    }
    return arrB;
}

module.exports = function getMove(brainId, moves, done) {
    var raw = null,
        optimalMoves = [],
        choice = null;

    try {
        raw =
        Brain
        .loadBrain(
            brainId
        )
        .activate(
            expandSamples(
                moves
            )
        );
    } catch (e) {
        raw = [
             1 * Math.random(),
            -1 * Math.random(),
             1 * Math.random(),
            -1 * Math.random(),
             1 * Math.random(),
            -1 * Math.random(),
             1 * Math.random(),
            -1 * Math.random(),
             1 * Math.random(),
            -1 * Math.random()
        ]
        .scramble()
        .scramble()
        .scramble()
        .scramble()
        .scramble()
        .slice(0,9);
    }

    var highest = -1;

    for (var i = 0; i < 9; i++) {
        if (+moves[i] === 0) {
            if (raw[i] > highest) {
                highest = raw[i];
                choice = i;
                optimalMoves.push(i);
            }
        }
    }

    done(null, {
        choice: choice,
        optimalMoves: optimalMoves,
        raw: raw
    });
};
