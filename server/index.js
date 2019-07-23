require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const Client = require('ssh2').Client;

// Website listing active DHCP leases in use by switches in need of configuration
const dhcpLeases = fs.readFileSync(process.env.TEST_DHCP_FILE).toString().split("\n");  

const app = express()
const port = 3000



app.get('/', cors(), (req, res) => {
  res.send(dhcpLeases)
})

app.get('/ssh/:ip/check/', cors(), (req, res) => {

  let conn = new Client();

    conn.on('error', (err) => {
      console.log(err)
      conn.end();
    }).connect({
      host: req.params.ip,
      username: process.env.SSH_USER,
      password: process.env.SSH_PASS,
      readyTimeout: Number(process.env.SSH_TIMEOUT)
    })

    conn.end()
 

  res.send("Online")
  
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
