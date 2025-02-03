const { sendWebhook } = require("./sendWebhook.js");
const { db } = require("../Database/initializeDB.js");
let month = new Date().toLocaleDateString("en-in", { month: "long" });
async function dateCheck() {
  const document = await db
    .collection(`powercuts-${month.toLowerCase()}`)
    .findOne({});
  let loggedDate = document.sentOn;
  let tomorrowDate = new Date(Date.now() + 24 * 60 * 60 * 1000).getDate();
  if (tomorrowDate === 1 && new Date().toDateString() !== loggedDate) {
    await sendWebhook(month, document);
    await db.collection(`powercuts-${month.toLowerCase()}`).updateOne(
      { id: 1 },
      {
        $set: {
          sentOn: new Date().toDateString(),
        },
      }
    );
  }
}

module.exports = { dateCheck };
