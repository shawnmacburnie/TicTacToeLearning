module.exports = function (brainId, moves, done) {
    var arrB = [];

    for (var i = 0; i < 9; i++) {
        if (moves.indexOf(i) === -1) {
            arrB.push(i);
        }
    }

    var choice = arrB[ parseInt(Math.random() * arrB.length) ];

    done(null, {
        choice: choice,
        optimalMoves: arrB
    });

};
