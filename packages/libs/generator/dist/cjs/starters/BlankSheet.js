"use strict";

var _core = require("@dogmalang/core");
const BlankSheet = _core.dogma.intf('BlankSheet', {
  ts: {
    optional: false,
    type: _core.num
  },
  job: {
    optional: true,
    type: _core.text
  }
});
module.exports = exports = BlankSheet;