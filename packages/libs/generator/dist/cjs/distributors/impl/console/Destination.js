"use strict";

var _core = require("@dogmalang/core");
const ConsoleDestination = _core.dogma.intf('ConsoleDestination', {
  id: {
    optional: false,
    type: _core.text
  }
});
module.exports = exports = ConsoleDestination;