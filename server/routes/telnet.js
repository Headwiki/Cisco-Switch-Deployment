const express = require('express')
const telnetController = require('./../controllers/telnet')
const router = express.Router()

router
  .route('/check')
  .get(telnetController.checkStatus)

router
  .route('/exec')
  .get(telnetController.executeCommands)

module.exports = router