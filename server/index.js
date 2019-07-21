require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const nodeSsh = require('node-ssh');

let ssh = new nodeSsh();

// Website listing active DHCP leases in use by switches in need of configuration

// Read 
const dhcpLeases = fs.readFileSync(process.env.TEST_DHCP_FILE).toString().split("\r\n");  

const app = express()
const port = 3000
  
app.get('/', cors(), async (req, res) => {
  res.send(dhcpLeases)
})

app.get('/ssh/:ip/check/', cors(), async (req, res) => {

  if (true) {
    res.send("Online")
  } else {
    res.send("Offline")
  }
})
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/* 
  Get active leases for new switches from DHCP server
    Check if they are online
      Get image and model info
          my $telnet = Net::Telnet::Cisco->new(Host => $node);
          $telnet->login($user,$pass);
          my @image = $telnet->cmd("show ver | i System image file is");
          my @type = $telnet->cmd("show ver | i cisco WS");
          my @serial = $telnet->cmd("show ver | i System serial number");
          my @cdp = $telnet->cmd("show cdp nei det");
      Check if switch needs upgrade
  Display switches

*/
