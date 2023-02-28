const getBugsReports = require("express").Router();
const { BugReport } = require("../../db");

getBugsReports.get("/", async (req, res) => {
  try {
    const bugsReports = await BugReport.findAll();

    return res.send(bugsReports);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = getBugsReports;
