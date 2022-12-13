"use strict";

var _core = require("@dogmalang/core");
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `exec: run '${params.command}'`;
  }
}
module.exports = exports = buildTitle;