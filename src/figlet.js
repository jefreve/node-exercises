"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var figlet = require("figlet");
figlet("Artistic banner", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
});
