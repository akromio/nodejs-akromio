"use strict";

var _core = require("@dogmalang/core");
const Stage = _core.dogma.intf('Stage', {
  name: {
    optional: false,
    type: _core.text
  },
  duration: {
    optional: false,
    type: _core.num
  }
});
module.exports = exports = Stage;