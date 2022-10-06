import * as http from "http";
import {readFile} from 'node:fs';

const host = 'localhost';
const port = 8000;

let indexFile;

const readData = (req, cb, err) => {
  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('error', err)
    .on('end', () => {
      body = Buffer.concat(body).toString();
      cb(JSON.parse(body));
    });
};

let users = [
  {
    id: "1",
    username: "Vlad",
    firstName: "Vladislav",
    lastName: "Coelho",
    email: "vladCoelho@gmail.com",
    password: "111111",
    phone: "+38097000000"
  },
];

const requestListener = (req, res) => {
  try {
    if (req.url.startsWith('/user')) {
      userController(req, res);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(404);
      res.end('Not found');
    }
  } catch (e) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify(e));
  }
};

const userController = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (/\/user\/?$/.test(req.url)) {
    switch (req.method) {
      case "POST":
        readData(req, (body) => {
          users.push(body);
          res.writeHead(200);
          res.end(`{message: "saved"}`);
        }, () => {
          res.writeHead(400);
          res.end(`{message: "some error"}`);
        });
        break;
      case "GET" :
        res.writeHead(200);
        res.end(JSON.stringify(users));
        break;
      default:
        res.writeHead(404);
        res.end(`{code: 404, message: "Resource not found"}`);
    }
  } else {
    const param = req.url.replace('/user/', '');
    switch (req.method) {
      case "POST":
        if (param === 'createWithArray') {
          readData(req, (body) => {
            users = [...users, ...body];
            res.writeHead(200);
            res.end(`{message: "saved"}`);
          }, () => {
            res.writeHead(400);
            res.end(`{message: "some error"}`);
          });
        } else {
          res.writeHead(404);
          res.end(`{code: 404, message: "Resource not found"}`);
        }
        break;
      case "GET":
        if (!/[a-zA-Z]+/.test(param)) {
          res.writeHead(400);
          res.end(`{code: 400, message: Invalid username supplied}`);
          return;
        }
        const userGet = users.find((u) => u.username === param);
        if (userGet) {
          res.writeHead(200);
          res.end(JSON.stringify(userGet));
        } else {
          res.writeHead(404);
          res.end(`{code: 404, message: "User not found"}`);
        }
        break;
      case "PUT":
        if (!/[a-zA-Z]+/.test(param)) {
          res.writeHead(400);
          res.end(`{code: 400, message: Invalid user supplied`);
          return;
        }
        const userIndex = users.findIndex((u) => u.username === param);
        if (userIndex < 0) {
          res.writeHead(404);
          res.end(`{code: 404, message: "User not found"}`);
        } else {
          readData(req, (body) => {
            users.splice(userIndex, 1, body);
            res.writeHead(200);
            res.end(JSON.stringify(users[userIndex]));
          }, () => {
            res.writeHead(400);
            res.end(`{message: "some error"}`);
          });
        }
        break;
      case "DELETE":
        if (!/[a-zA-Z]+/.test(param)) {
          res.writeHead(400);
          res.end(`{code: 400, message: Invalid user supplied`);
          return;
        }
        const userDeleted = users.findIndex((u) => u.username === param);
        if (userDeleted < 0) {
          res.writeHead(404);
          res.end(`{code: 404, message: "User not found"}`);
        } else {
          users.splice(userDeleted, 1);
          res.writeHead(200);
          res.end(`{code: 200, message: "User deleted"}`);
        }
        break;
      default:
        res.writeHead(404);
        res.end(`{code: 404, message: "Resource not found"}`);
    }
  }
};

const server = http.createServer(requestListener);


readFile(process.cwd() + "/src/index.html", 'utf8', ((err, data) => {
  if (err) {
    console.error(`Could not read index.html file: ${err}`);
    process.exit(1);
    return;
  }
  indexFile = data;
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}));
