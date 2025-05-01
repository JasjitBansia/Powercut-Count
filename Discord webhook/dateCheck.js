const { sendWebhook } = require("./sendWebhook.js");
const { db } = require("../Database/initializeDB.js");
let monthAndYear =
  new Date().toLocaleDateString("en-in", { month: "long" }) +
  "-" +
  new Date().getFullYear().toString();
let month = new Date().toLocaleDateString("en-in", { month: "long" });
async function dateCheck() {
  const document = await db.collection(monthAndYear.toLowerCase()).findOne({});
  let loggedDate = document.sentOn;
  let tomorrowDate = new Date(Date.now() + 24 * 60 * 60 * 1000).getDate();
  if (tomorrowDate === 1 && new Date().toDateString() !== loggedDate) {
    await sendWebhook(month, document);
    await db.collection(`powercuts-${monthAndYear.toLowerCase()}`).updateOne(
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
