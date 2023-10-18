function luckyDraw(player: string): Promise<string | Error> {
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
// Players: Tina, Jorge, Julien

async function getResults(): Promise<void> {
  const results: PromiseSettledResult<string | Error>[] =
    await Promise.allSettled([
      luckyDraw("Tina"),
      luckyDraw("Jorge"),
      luckyDraw("Julien"),
    ]);

  results.forEach((result) =>
    result.status === "fulfilled"
      ? console.log(result.value)
      : console.log(`Error: ${result.reason.message}`)
  );
}

getResults();
