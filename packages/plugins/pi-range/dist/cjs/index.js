"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "range",
  ["desc"]: "Plugin for returning a list with a sequence of numbers between given two.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "range",
  ["ops"]: {
    ["range"]: _core.dogma.use(require("./ops/range"))
  }
};