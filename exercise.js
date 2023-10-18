function luckyDraw(player) {
    return new Promise(function (resolve, reject) {
        var win = Boolean(Math.round(Math.random()));
        process.nextTick(function () {
            if (win) {
                resolve("".concat(player, " won a prize in the draw!"));
            }
            else {
                reject(new Error("".concat(player, " lost the draw.")));
            }
        });
    });
}
// Players: Joe, Caroline, Sabrina
luckyDraw("Joe")
    .then(function (luckyDrawPlayer1) { return console.log(luckyDrawPlayer1); })
    .then(function () { return luckyDraw("Caroline"); })
    .then(function (luckyDrawPlayer2) { return console.log(luckyDrawPlayer2); })
    .then(function () { return luckyDraw("Sabrina"); })
    .then(function (luckyDrawPlayer3) { return console.log(luckyDrawPlayer3); })
    .catch(function (error) { return console.error(error); });
