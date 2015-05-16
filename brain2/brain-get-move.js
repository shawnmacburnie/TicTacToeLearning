Brain = require('./brain-files');

function scramble(inarr) {
    var arr = [];
    var isEven = inarr.length % 2 === 0;

    for (var i = isEven ? 0 : 1, j = inarr.length - 1; i < j; i++, j--) {
        if (Math.random() > 0.5) {
            arr.push(inarr[i]);
            arr.push(inarr[j]);
        } else {
            arr.push(inarr[j]);
            arr.push(inarr[i]);
        }
    }

    if (!isEven) {
        arr.splice( parseInt(Math.random() * arr.length), 0, inarr[0] )
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
            // expandSamples(
                moves
            // )
        );
    } catch (e) {
        throw e;
        raw = scramble(scramble(scramble(scramble([
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
        ]))))
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
