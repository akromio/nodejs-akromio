"use strict";

var _core = require("@dogmalang/core");
const TriggerImpl = _core.dogma.intf('TriggerImpl', {
  start: {
    optional: false,
    type: _core.func
  },
  stop: {
    optional: false,
    type: _core.func
  }
});
module.exports = exports = TriggerImpl;