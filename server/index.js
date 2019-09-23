require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const fs = require('fs');

// Website listing active DHCP leases in use by switches in need of configuration
const dhcpLeases = fs.readFileSync(process.env.TEST_DHCP_FILE).toString().split("\n");

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())

// Load routes
app.use('/', require('./routes'))

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
