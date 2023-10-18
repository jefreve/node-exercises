import * as fs from "node:fs";

fs.writeFile(
  "outputFile.txt",
  "🎧",
  "utf-8",
  function (error: NodeJS.ErrnoException | null): NodeJS.ErrnoException | void {
    if (error) {
      throw error;
    }
    console.log("File saved");
  }
);
