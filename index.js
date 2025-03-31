const fs = require("fs/promises");
const { dateCheck } = require("./Discord webhook/dateCheck.js");
require("./Database/initializeDB.js").connect();

async function readTimeStamp() {
  try {
    const data = await fs.readFile("./log.txt", "utf8");
    return data;
  } catch (e) {
    console.log("An error occurred:", e.message);
  }
}

async function writeTimestamp() {
  let lastTimestamp = await readTimeStamp();
  let currentTimestamp = Date.now().toString();
  try {
    await fs.writeFile("./log.txt", currentTimestamp);
    if ((currentTimestamp - lastTimestamp) / 1000 > 25) {
      let month = new Date(Number.parseInt(currentTimestamp))
        .toLocaleDateString("en-in", { month: "long" })
        .toLowerCase();
      const { addLog } = require("./Database/addLog.js");
      await addLog(
        month,
        new Date(Number.parseInt(currentTimestamp)).toLocaleString("en-IN")
      );
    }
  } catch (e) {
    console.log("An error occurred: ", e);
  }
}
setInterval(writeTimestamp, 10000);
setInterval(dateCheck, 6 * 60 * 60 * 1000);
