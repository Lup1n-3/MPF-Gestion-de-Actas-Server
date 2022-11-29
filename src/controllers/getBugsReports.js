const getBugsReports = require("express").Router();
const { BugReport } = require("../db");

getBugsReports.get("/", async (req, res) => {
  try {
    const bugsReports = await BugReport.findAll();
    return res.json(bugsReports);
  } catch (err) {
    console.log(err);
  }
});

module.exports = getBugsReports;
