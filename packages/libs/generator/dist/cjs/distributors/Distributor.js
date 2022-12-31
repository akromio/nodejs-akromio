"use strict";

var _core = require("@dogmalang/core");
const Distributor = _core.dogma.intf('Distributor', {
  start: {
    optional: false,
    type: _core.func
  }
});
module.exports = exports = Distributor;