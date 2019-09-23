const express = require('express')
const telnetController = require('./../controllers/telnet')
const router = express.Router()

router
  .route('/:ip/check')
  .get(telnetController.checkStatus)

  router
  .route('/:ip/getInfo')
  .get(telnetController.getInfo)

router
  .route('/:ip/exec')
  .get(telnetController.executeCommands)

module.exports = router