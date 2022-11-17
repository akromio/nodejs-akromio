"use strict";

var _core = require("@dogmalang/core");
function trim(value) {
  /* c8 ignore next */_core.dogma.expect("value", value, _core.text);
  {
    return value.trim();
  }
}
module.exports = exports = trim;