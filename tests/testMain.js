'use strict';

var Forwarder = require('./TestForwarder');
var Gateway = require('./../Gateway');
var GwMonitor = require('./../GwMonitor');
var log = require('./../Logger');
var program = require('commander');

program
  .version('0.0.1')
  .option('-v, --verbose [level]', 'Verbosity level for logging (fatal, error, warn, info, debug, trace) [debug]', 'debug')
  .parse(process.argv);

log.level(program.verbose);

var forwarder = new Forwarder();

var gw = new Gateway(forwarder);


gw.init('http://localhost:1883');

gw.on('ready', function onGwReady()
  {
    var gwMon = new GwMonitor(gw);
    log.info("Gateway Started");
  });
