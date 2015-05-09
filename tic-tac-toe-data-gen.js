function cc(func) {
    var a = 0,
        b = 0,
        c = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0;

    for (a = 0; a < 9; a++)
    for (b = 0; b < 9; b++)
    if (b !== a)
    for (c = 0; c < 9; c++)
    if (c !== a && c !== b)
    for (d = 0; d < 9; d++)
    if (d !== a && d !== b && d !== c)
    for (e = 0; e < 9; e++)
    if (e !== a && e !== b && e !== c && e !== d)
    if (!func([a,b,c,d,e]))
    for (f = 0; f < 9; f++)
    if (f !== a && f !== b && f !== c && f !== d && f !== e)
    if (!func([a,b,c,d,e,f]))
    for (g = 0; g < 9; g++)
    if (g !== a && g !== b && g !== c && g !== d && g !== e && g !== f)
    if (!func([a,b,c,d,e,f,g]))
    for (h = 0; h < 9; h++)
    if (h !== a && h !== b && h !== c && h !== d && h !== e && h !== f && h !== g)
    if (!func([a,b,c,d,e,f,g,h]))
    for (i = 0; i < 9; i++)
    if (i !== a && i !== b && i !== c && i !== d && i !== e && i !== f && i !== g && i !== h)
        func([a,b,c,d,e,f,g,h,i], true);
}

Array.prototype.odds = function() {
    var odds = [];
    for (var i = 1; i < this.length; i+=2) {
        odds.push(this[i]);
    }
    return odds;
};
Array.prototype.evens = function() {
    var evens = [];
    for (var i = 0; i < this.length; i+=2) {
        evens.push(this[i]);
    }
    return evens;
};

var xwins = 0;
var owins = 0;

cc(function (arr, print) {
    var xwon = false, owon = false,
    xpos = arr.evens().sort().join(''), opos = arr.odds().sort().join('');

    if (
        (xpos.indexOf('012') !== -1) ||
        (xpos.indexOf('345') !== -1) ||
        (xpos.indexOf('678') !== -1) ||
        (xpos.indexOf('036') !== -1) ||
        (xpos.indexOf('147') !== -1) ||
        (xpos.indexOf('258') !== -1) ||
        (xpos.indexOf('048') !== -1) ||
        (xpos.indexOf('246') !== -1)
    ) xwins+=+(print = xwon = true);
    if (
        (opos.indexOf('012') !== -1) ||
        (opos.indexOf('345') !== -1) ||
        (opos.indexOf('678') !== -1) ||
        (opos.indexOf('036') !== -1) ||
        (opos.indexOf('147') !== -1) ||
        (opos.indexOf('258') !== -1) ||
        (opos.indexOf('048') !== -1) ||
        (opos.indexOf('246') !== -1)
    ) owins+=+(print = owon = true);



// print
    if (print) {
        var printArr = ['','','','','','','','','','',''];
        printArr[0] =+ xwon;
        printArr[1] =+ owon;
        for (var i = 0; i < arr.length; i++) {
            printArr[i+2] = arr[i];
        }
        console.log(''+printArr);
    }
    return print;
});

//console.log(xwins, owins);
