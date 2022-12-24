"use strict";

var _core = require("@dogmalang/core");
const RunReq = _core.dogma.use(require("../RunReq"));
const JobInfo = _core.dogma.intf('JobInfo', {
  weight: {
    optional: false,
    type: _core.num
  }
}, RunReq);
module.exports = exports = JobInfo;