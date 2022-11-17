"use strict";

var _core = require("@dogmalang/core");
function isTruthy(value) {
  {
    return [true, "true", "t", "yes", "y"].includes(value);
  }
}
module.exports = exports = isTruthy;