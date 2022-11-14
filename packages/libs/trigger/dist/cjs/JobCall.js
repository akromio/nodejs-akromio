"use strict";

var _core = require("@dogmalang/core");
const JobCall = _core.dogma.intf('JobCall', {
  jobName: {
    optional: false,
    type: _core.text
  },
  args: {
    optional: true,
    type: _core.any
  }
});
module.exports = exports = JobCall;