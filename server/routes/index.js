const express = require('express');
const router = express.Router();

// Mount sub routers
router.use('/telnet/:ip', require('./telnet'));

router.get('/', (req, res) => {
    res.send(dhcpLeases)
})

module.exports = router;