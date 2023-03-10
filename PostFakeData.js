const https = require("https");
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const csvtojson = require("csvtojson");
const _ = require("underscore");

const OPENSEARCH_LOGIN = "dsappfeuser";
const OPENSEARCH_PASS = "D-sapinternship@2023";
const OPENSEARCH_ENDPOINT =
  "https://search-dsap-pfe-v7a4wvssndu5fox23zuv525jjq.eu-west-3.es.amazonaws.com";
const region = "eu-west-3";

const filePath = "./csvFile/methania__data.csv";
const methania = require("./ReturnAllValues");

csvtojson({ delimiter: "auto", trim: false, checkType: true })
  .fromFile(filePath)
  .then((jsonArray) => {
    var object = methania.AllValues(jsonArray);
    //concatenate Date + hour
    jsonArray.forEach((row) => {
      var date = row["Date"].replaceAll("/", "-");
      var time = row["UTC_Time"];
      var d = new Date(date + " " + time + " UTC").toISOString();
      row["timestamp"] = d; //
      row["CO2_epargne"] = object.CO2_epargne;
      row["Disponibilite_d_installation_jour"] =
        object.Disponibilite_d_installation_jour;
      row["Disponibilite_d_installation_mois"] =
        object.Disponibilite_d_installation_mois;
      row["Disponibilite_des_moteur_jour"] =
        object.Disponibilite_des_moteur_jour;
      row["Disponibilite_des_moteur_mois"] =
        object.Disponibilite_d_installation_mois;
      row["Energie_produite_par_moteur1"] = object.Energie_produite_par_moteur1;
      row["Energie_produite_par_moteur2"] = object.Energie_produite_par_moteur2;
      row["Energie_produite_totale"] = object.Energie_produite_totale;
    });
    //Check
    console.log(Object.keys(jsonArray[0]));
    console.log(jsonArray[0]);

    resp = postDataES(OPENSEARCH_ENDPOINT, { id: "methania_plc" }, jsonArray);
    console.log(resp);
  })
  .catch((err) => {
    // log error if any
    console.log(err);
  });

const postDataES = async (esUrl, machine, data, chunkSize = 20) => {
  const chunks = chunksSplit(data, chunkSize);
  let response = [];
  for await (const chunk of chunks) {
    let dataBody = "";
    chunk.map((d) => {
      var doc_id = d.Record;
      console.log(doc_id);
      dataBody += `{ "index": { "_index": "machine_${machine.id}_lastest", "_id": ${doc_id}} } }\n`;
      dataBody += `${JSON.stringify(d)}\n`;
    });
    dataBody += `\n`;
    const responseChunk = await requestES(esUrl, {
      method: "POST",
      path: "/_bulk",
      body: dataBody,
    });
    response = [...response, ...responseChunk.items];
  }
  return response;
};

const chunksSplit = (array, size = 10) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunks.push(chunk);
  }
  return chunks;
};

const requestES = async (esUrl, options = {}) => {
  const req = new AWS.HttpRequest(esUrl, region);
  const endpoint = new urlParse(esUrl).hostname.toString();

  req.method = options.method || "GET";
  req.path = options.path || "/";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = options.contentType || "application/json";
  const auth =
    "Basic " +
    Buffer.from(`${OPENSEARCH_LOGIN}:${OPENSEARCH_PASS}`).toString("base64");
  req.headers["Authorization"] = auth;
  req.body = options.body || req.body;

  return await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      let data = "";
      result.on("data", (chunk) => {
        console.log("chunk layer requestES : ", chunk);
        data += chunk;
      });
      result.on("end", () => {
        console.log("data layer requestES : ", data);
        const dataString = data.toString();
        console.log("dataString layer requestES : ", dataString);
        const dataObject = JSON.parse(dataString);
        console.log("dataObject layer requestES : ", dataObject);
        resolve(dataObject);
      });
    });

    httpRequest.write(req.body || "");
    httpRequest.end();
  });
};
