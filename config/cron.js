const cron = require("cron");
const https = require("https");

// Run every minute: "* * * * *"
const job = new cron.CronJob("*/10 * * * *", function () {
  console.log("Cron job running at:", new Date().toISOString());

  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

// Start the job
// job.start();

module.exports = job;
