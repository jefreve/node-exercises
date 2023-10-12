import * as fs from "node:fs";

fs.writeFile(
  "outputFile.txt",
  "This is some text content",
  "utf-8",
  function (error) {
    if (error) {
      throw error;
    }
    console.log("File saved");
  }
);
