'use strict';

var Forwarder = require('./Forwarder');
var Gateway = require('./Gateway');
var GwMonitor = require('./GwMonitor');
var log = require('./Logger');
var program = require('commander');

program
  .version('0.1.0')
  .option('-v, --verbose [level]', 'Verbosity level for logging (fatal, error, warn, info, debug, trace) [info]', 'info')
  .option('-p, --port [serial port]', 'Serial Port path [/dev/tty.SLAB_USBtoUART]', '/dev/tty.SLAB_USBtoUART')
  .option('-b, --broker [url]', 'MQTT broker URL [http://localhost:1883]', 'http://localhost:1883')
  .parse(process.argv);

log.level(program.verbose);

var forwarder = new Forwarder(program.port, 115200);

var gw = new Gateway(forwarder);

gw.init(program.broker);

gw.on('ready', function onGwReady()
  {
    var gwMon = new GwMonitor(gw);
    log.info("Gateway Started");
  });

