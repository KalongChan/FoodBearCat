const MongoClient = require("mongodb").MongoClient;
const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, "../../.env")});
const DUMMY_MENU = require("../../DUMMY_ACCOUNT.json");

async function helper(req, res) {
  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_DB = process.env.MONGODB_DB;

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const menuCollection = db.collection("accounts");
  let result = await menuCollection.deleteMany();
  result = await menuCollection.insertMany(DUMMY_MENU);
  console.log(result);

  client.close();
}

helper();
