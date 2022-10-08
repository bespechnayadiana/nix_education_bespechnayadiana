import * as http from "http";
import csv from 'csvtojson';

const host = 'localhost';
const port = 8000;

const csvFilePath = process.cwd() + "/src/device.csv";

const requestListener = (req, res) => {
  csv().fromFile(csvFilePath).then((jsonObj) => {
    sendFile(jsonObj, res)
  }, (err) => {
    if (err) {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(500);
      console.log(err)
      res.end(JSON.stringify(err));
      return;
    }
  });
};

function sendFile(contents, res) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(contents));
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
