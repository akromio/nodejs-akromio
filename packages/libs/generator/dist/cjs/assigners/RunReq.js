"use strict";

var _core = require("@dogmalang/core");
const JobInfo = _core.dogma.use(require("../JobInfo"));
const RunReq = _core.dogma.intf('RunReq', {
  ts: {
    optional: false,
    type: _core.num
  },
  assignTs: {
    optional: false,
    type: _core.num
  }
}, JobInfo);
module.exports = exports = RunReq;