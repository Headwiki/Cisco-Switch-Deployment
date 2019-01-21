require('dotenv').config();
const axios = require('axios');
const express = require('express');
const ping = require('ping');

// Website listing active DHCP leases in use by switches in need of configuration
const dhcpServer = process.env.DHCP_SERVER;  

const app = express()
const port = 3000
  
app.get('/', async (req, res) => {
  let ips =  await axios.get(dhcpServer)
  .then(response => { return response.data })
  .catch(error => {
    return error
  });

  res.send(ips)
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
