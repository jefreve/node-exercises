import figlet = require("figlet");

figlet(
  "Artistic banner",
  function (err: Error | null, data: string | undefined): void {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  }
);
