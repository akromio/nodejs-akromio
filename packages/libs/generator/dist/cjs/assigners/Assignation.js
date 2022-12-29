"use strict";

var _core = require("@dogmalang/core");
const JobInfo = _core.dogma.use(require("../JobInfo"));
const Assignation = _core.dogma.intf('Assignation', {
  weight: {
    optional: false,
    type: _core.num
  }
}, JobInfo);
module.exports = exports = Assignation;