"use strict";

var _core = require("@dogmalang/core");
function split(value, sep) {
  /* c8 ignore next */_core.dogma.expect("value", value, _core.text); /* c8 ignore next */
  _core.dogma.expect("sep", sep, _core.text);
  {
    return value.split(sep);
  }
}
module.exports = exports = split;