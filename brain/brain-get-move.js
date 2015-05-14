Net = require('./brain/net');

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

function getSamples(arr) {

    var first = arr.length%2===0;

    arrB = [0,0,0, 0,0,0, 0,0,0];
    for (var i = 0; i < arr.length-1; i++) {
        var even = i%2===0;

        arrB[ arr[ i ] ] = first ? (even ? 1 : -1) : (even ? -1 : 1);
    }
    return arrB;
}

module.exports = function (brainId, moves, done) {
    var arrB = [];

    for (var i = 0; i < 9; i++) {
        if (moves[i] === 0) {
            arrB.push(i);
        }
    }

    var choice = arrB[ parseInt(Math.random() * arrB.length) ];


    try {
        var net = Net.from(require('./training/net-brain-'+brainId+'.json'));
        var raw = net.feedForward(moves);
        arrB = [];
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
             1 * Math.random()
        ].scramble();
    }

    var highest = -1;

    for (var i = 0; i < 9; i++) {
        if (moves[i] === 0) {
            if (raw[i] > highest) {
                highest = raw[i];
                choice = i;
            }
            if (raw[i] > 0) {
                arrB.push(i);
            }
        }
    }

    done(null, {
        choice: choice,
        optimalMoves: arrB,
        raw: raw
    });
};
