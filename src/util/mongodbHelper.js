const MongoClient = require("mongodb").MongoClient;
const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, "../../.env")});
const DUMMY_MENU = require("../../DUMMY_MENU.json");

async function helper(req, res) {
  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_DB = process.env.MONGODB_DB;

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const menuCollection = db.collection("menus");
  let result = await menuCollection.deleteMany();
  result = await menuCollection.insertMany(DUMMY_MENU);
  console.log(result);

  let categories = [];
  let obj = [];
  DUMMY_MENU.forEach((data) => categories.push(data.category));
  categories = [...new Set(categories)];
  categories.forEach((category) => {
    obj.push({name: category});
  });

  const categoryCollection = db.collection("categories");
  result = await categoryCollection.deleteMany();
  result = await categoryCollection.insertMany(obj);

  client.close();
}

helper();
