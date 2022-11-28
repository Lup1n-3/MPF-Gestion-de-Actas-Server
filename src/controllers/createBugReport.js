const createBugReport = require("express").Router();
const { BugReport } = require("../db");

createBugReport.post("/", async (req, res) => {
  const bugReport = req.body.bugReport;

  console.log(bugReport);
  try {
    const newBugReport = await BugReport.create(bugReport);

    console.log(newBugReport);

    res.status(200).send(newBugReport);
  } catch (error) {
    console.log(err);
  }
});

module.exports = createBugReport;
