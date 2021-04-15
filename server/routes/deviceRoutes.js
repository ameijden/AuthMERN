const express = require("express");
const router = express.Router();

//Controller Imports
var authController = require("../controllers/authController");
var deviceController = require("../controllers/deviceController");

//All routes after this are protected
router.use(authController.ensureSignedIn);

//Device Routes
router.post("/addDevice", deviceController.addDevice);
router.post("/updateDevice", deviceController.updateDevice);
router.post("/findDevicesByFilter", deviceController.findDevicesByFilter);
router.post("/findCountriesByFilter", deviceController.findCountriesByFilter);
router.post("/findCompaniesByFilter", deviceController.findCompaniesByFilter);
router.get("/findDeviceById/:id", deviceController.findDeviceById);
router.get("/all", deviceController.getAllDevices);
router.delete("/delete/:id", deviceController.deleteDeviceById);

module.exports = router;
