"use strict";

var _core = require("@dogmalang/core");
function isFalsey(value) {
  {
    return [false, "false", "f", "no", "n"].includes(value);
  }
}
module.exports = exports = isFalsey;