const Telnet = require('telnet-client')

module.exports = {
    checkStatus: (req, res, next) => {
        let conn = new Telnet();

        conn.on('connect', function () {
          console.log('Client :: connected');
          res.send("Online")
          conn.end()
        }).on('data', () => {
          console.log(data)
        }).on('timeout', () => {
          console.log('Client :: Timeout');
          res.send("Offline")
          conn.end();
        }).on('error', (err) => {
          console.log('Client :: Error' + err);
          res.send("Offline")
          conn.end();
        }).on('failedLogin', (msg) => {
          console.log('Client :: failedLogin' + msg);
          res.send("Offline")
          conn.end();
        }).connect({
          host: req.params.ip,
          port: 23,
          timeout: 5000
        }).catch(error => {
          console.error("Failed to connect to: " + req.params.ip + ", " + error)
        })
    },
    executeCommands: (req, res, next) => {
        let conn = new Telnet();

        conn.on('ready', (prompt) => {
          console.log('ready')
          conn.exec('show clock', (err, resp) => {
              console.log(resp)
          })
          res.send("Exec")
          conn.end()
        }).on('data', () => {
          console.log(data)
        }).on('error', (err) => {
          console.log('Client :: Error' + err);
          res.send("Offline")
          conn.end();
        }).on('failedLogin', (msg) => {
          console.log('Client :: failedLogin' + msg);
          res.send("Offline")
          conn.end();
        }).connect({
          host: req.params.ip,
          shellPrompt: /(SWI-ROGUE+(#|>))/,
          loginPrompt: 'Username: ',
          passwordPrompt: 'Password: ',
          username: 'cisco',
          password: 'cisco',
          port: 23,
          timeout: 5000
        }).catch(error => {
          console.error("Failed to connect to: " + req.params.ip + ", " + error)
        })
    },
    getInfo: (req, res, next) => {
        let conn = new Telnet();

        let commands = {
            image: 'show version | i System image file is',
            model: 'show version | i cisco WS',
            serial: 'show version | i System serial number',
            cdp: 'show cdp nei det'
        }

        conn.on('ready', (prompt) => {
          console.log('ready')
            res.send(execCommands(conn, commands))
        }).on('data', () => {
          console.log(data)
        }).on('error', (err) => {
          console.log('Client :: Error' + err);
          res.send("Offline")
          conn.end();
        }).on('failedLogin', (msg) => {
          console.log('Client :: failedLogin' + msg);
          res.send("Offline")
          conn.end();
        }).connect({
          host: req.params.ip,
          shellPrompt: /(SWI-ROGUE+(#|>))/,
          loginPrompt: 'Username: ',
          passwordPrompt: 'Password: ',
          username: 'cisco',
          password: 'cisco',
          port: 23,
          timeout: 5000
        }).catch(error => {
          console.error("Failed to connect to: " + req.params.ip + ", " + error)
        })
    }
}

function execCommands(connection, commands) {

    /*
        connection input: 
            instance of telnet-client

        commands input:
            {
                tag1: command1,
                tag2: command2
            }
    */

    let response = {}

    for (let tag in commands) {
        if (commands.hasOwnProperty(tag)) {
            connection.exec(commands[tag], (err, resp) => {
                if (err) response[tag] = err
                else response[tag] = resp 
            })
        }
    }

    return response
}