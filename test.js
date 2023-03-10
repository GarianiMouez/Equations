const methania = require("./ReturnAllValues");

const fs = require("fs");
const filePath = "./methania_data.json";

////// data of json /////
const jsonData = fs.readFileSync(filePath);
const data = JSON.parse(jsonData);
const met = methania.AllValues(data);
console.log(met);
