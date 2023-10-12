function luckyDraw(player: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const win: boolean = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

// Players: Joe, Caroline, Sabrina

luckyDraw("Joe")
  .then((luckyDrawPlayer1: string) => console.log(luckyDrawPlayer1))
  .then(() => luckyDraw("Caroline"))
  .then((luckyDrawPlayer2: string) => console.log(luckyDrawPlayer2))
  .then(() => luckyDraw("Sabrina"))
  .then((luckyDrawPlayer3: string) => console.log(luckyDrawPlayer3))
  .catch((error: Error) => console.error(error));
