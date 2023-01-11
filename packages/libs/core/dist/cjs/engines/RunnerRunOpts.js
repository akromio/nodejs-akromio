"use strict";

var _core = require("@dogmalang/core");
const RunOpts = _core.dogma.use(require("./RunOpts"));
const RunnerRunOpts = _core.dogma.intf('RunnerRunOpts', {
  dataset: {
    optional: false,
    type: null
  }
}, RunOpts);