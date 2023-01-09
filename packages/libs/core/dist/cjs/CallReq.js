"use strict";

var _core = require("@dogmalang/core");
const CallReq = _core.dogma.intf('CallReq', {
  jobName: {
    optional: false,
    type: _core.text
  },
  args: {
    optional: true,
    type: _core.any
  }
});
module.exports = exports = CallReq;