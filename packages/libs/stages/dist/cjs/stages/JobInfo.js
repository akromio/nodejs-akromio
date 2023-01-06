"use strict";

var _core = require("@dogmalang/core");
const JobInfo = _core.dogma.intf('JobInfo', {
  job: {
    optional: false,
    type: _core.text
  },
  args: {
    optional: true,
    type: _core.any
  },
  weight: {
    optional: false,
    type: _core.num
  }
});
module.exports = exports = JobInfo;