//Environment variables
require("dotenv/config");

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT ?? 8001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// middleware & static files
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.json());

//Constants and variables
var siteId = "60e761d4be0c836d2973fe26";
const config = {
  headers: {
    Authorization: `Bearer 4182751cd912ec9378c39911fa04d124dfa028819228ee1ee7856a770aa6fe52`,
    "accept-version": "1.0.0",
    "content-type": "application/json",
  },
};
var collectionId = "62291cd7a326dc78a69c5fd3";

var url, result;

// Get the XML data
app.get("/data", async (req, res, next) => {
  url =
    "https://www.machinefinder.com/dealer_families/9336/machine_feed.xml?key=b562ff30-f65b-0131-e164-005056be003c&password=Deere4";
  result = await axios.post(url);
  res.set("Content-Type", "text/xml");
  res.send(result.data);
});

// add a webflow item in a collection info
app.post("/collection/item/add", async (req, res, next) => {
  try {
    url = `https://api.webflow.com/collections/${collectionId}/items`;
    var data = JSON.stringify({ fields: req.body });
    result = await axios.post(url, data, config);
    res.send(JSON.stringify(result.data));
  } catch (e) {
    console.log("An error has occured", e);
  }
});
