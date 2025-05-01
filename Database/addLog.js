const { db } = require("./initializeDB.js");
async function addLog(monthAndYear, date) {
  let collection = db.collection(`powercuts-${monthAndYear}`);
  let collectionArray = await collection.find({}).toArray();
  if (collectionArray.length === 0) {
    await collection.insertOne({
      id: 1,
      powerloss: 1,
      dateAndTime: date,
      sentOn: "",
    });
    console.log("Document created");
  } else {
    await collection.updateOne(
      { id: 1 },
      { $inc: { powerloss: 1 }, $set: { dateAndTime: date } }
    );
    console.log("Document updated");
  }
}

module.exports = { addLog };
