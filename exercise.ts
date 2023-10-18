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

async function getResults(): Promise<void> {
  try {
    const results = await Promise.all([
      luckyDraw("Tina"),
      luckyDraw("Jorge"),
      luckyDraw("Julien"),
    ]);

    results.forEach((result) => console.log(result));
  } catch (error) {
    console.error(error);
  }
}

getResults();
