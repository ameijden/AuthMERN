const express = require("express");
const router = express.Router();

//Controller Imports
var authController = require("../controllers/authController");
var logController = require("../controllers/logController");


//Log Routes
router.post("/add", logController.addLogEntry);

//All routes after this are protected
router.use(authController.ensureSignedIn);

router.get("/filter/:filters", logController.findLogEntriesByFilter);
router.get("/id", logController.findLogEntryById);
router.get("/device", logController.findLogEntryByDeviceId);
router.get("/all", logController.getAllLogEntries);
router.delete("/filter/:filters", logController.deleteLogEntriesByFilter);
router.delete("/id/:id", logController.deleteLogEntryByDeviceId);
router.delete("/company/:company", logController.deleteLogEntriesByCompany);
router.delete("/country/:country", logController.deleteLogEntriesByCountry);
router.delete("/all", logController.deleteAllLogEntries);

module.exports = router;
