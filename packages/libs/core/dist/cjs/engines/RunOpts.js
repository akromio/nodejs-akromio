"use strict";

var _core = require("@dogmalang/core");
const RunOpts = _core.dogma.intf('RunOpts', {
  onError: {
    optional: false,
    type: ["carryOn", "finish"]
  }
});
module.exports = exports = RunOpts;