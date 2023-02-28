const createBugReport = require("express").Router();
const { BugReport } = require("../../db");

createBugReport.post("/", async (req, res) => {
  try {
    const newBugReport = await BugReport.create(req.body.bugReport);

    res.status(200).send(newBugReport);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = createBugReport;
