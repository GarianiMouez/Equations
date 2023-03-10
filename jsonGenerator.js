const fs = require("fs");
const csvPath = "./csvFile/methania__data.csv";

const JsonPath = "./methania_data.json";
const csv2json = require("csvtojson");
csv2json()
  .fromFile(csvPath)
  .then((json) => {
    console.log(json);
    fs.writeFileSync(JsonPath, JSON.stringify(json), "utf-8", (err) => {
      if (err) console.log(err);
    });
  });
