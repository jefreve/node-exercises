"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
fs.writeFile("outputFile.txt", "🎧", "utf-8", function (error) {
    if (error) {
        throw error;
    }
    console.log("File saved");
});
