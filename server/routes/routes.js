const express = require("express");
const router = express.Router();

var authRoutes = require("./authRoutes")
// var deviceRoutes = require("./deviceRoutes")
// var logRoutes = require("./logRoutes")

router.use('/auth', authRoutes);
// router.use('/devices', deviceRoutes);
// router.use('/logs', logRoutes);

//
router.get("/status", function (res, res) {
  res.status(200).send(`
    <body style="background-color: #008080; margin: 0; padding: 0">
      <div style="height: 100vh; display: flex; justify-content: center; align-items: center; color: white ;">
          <pre style="font-size: 30px">API   IS   ONLINE</pre>
      </div>
    </body>
  `);
});

module.exports = router;
