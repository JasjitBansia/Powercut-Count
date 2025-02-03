let tokens = require("../tokens.json");
let color;
let status;
async function sendWebhook(month, document) {
  let powercuts = Math.floor(document.powerloss / 2);
  if (powercuts <= 30) {
    color = 3066993;
    status = "Good";
  } else if (powercuts > 30 && powercuts <= 70) {
    color = 15844367;
    status = "Mid";
  } else {
    color = 15158332;
    status = "BRAINDEAD BRUH ISTG SKILL ISSUE INCOMPETENT PEOPLE";
  }

  fetch(tokens.webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Bijli waale",
      avatar_url:
        "https://totalenergies.com/sites/g/files/nytnzq121/files/styles/w_1110/public/images/2024-02/Cover_electricite.jpg",
      content: "<@740131838844207164>",

      embeds: [
        {
          title: `${month} powercuts report`,
          description: `\nPower cuts this month: **${powercuts}**\nLast logged: **${
            document.dateAndTime
          }**\nEst. powercuts per day: **${(powercuts / 30).toFixed(
            1
          )}**\nStatus: **${status}**`,
          color: color,
          thumbnail: {
            url: "https://i.ytimg.com/vi/_2LpCdhuOyQ/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-BIAC4AOKAgwIABABGEkgXChlMA8=&rs=AOn4CLBuGlXMcQ9ZVCqfGSCjwdfPIbN_lQ",
          },
        },
      ],
    }),
  });
}
module.exports = { sendWebhook };
