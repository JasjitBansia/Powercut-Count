const tokens = require("../tokens.json");
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(tokens.mongoDB_connection_string);
async function connect() {
  try {
    await mongoClient.connect();
    console.log("Connected to db");
  } catch (e) {
    console.log("An error occurred: ", e.message);
  }
}
const db = mongoClient.db("powercuts");
module.exports = { connect, db };
