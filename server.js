const express = require("express");
const https = require("https");
const fs = require("fs");
const history = require("connect-history-api-fallback");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const auth = require("./authMiddleware");
const router = jsonServer.router("./serverdata.json");

const enableHttps = false;

const sslOptions = { }

if (enableHttps) {
    sslOptions.cert = fs.readFileSync("./ssl/sportsstore.crt");
    sslOptions.key = fs.readFileSync("./ssl/sportsstore.pem");
}

const app = express();

app.use(bodyParser.json());
app.use(auth);
app.use("/api", router);
app.use(history());
app.use("/", express.static("./dist/sports-store/browser"));

app.listen(8080,
    () => console.log("HTTP server running on port 8080")
);

if (enableHttps) {
    https.createServer(sslOptions, app).listen(443,
        () => console.log("HTTPS server running on port 443")
    );
} else {
    console.log("HTTPS disabled");
}

