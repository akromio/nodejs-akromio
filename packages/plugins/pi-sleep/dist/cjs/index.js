"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "sleep",
  ["desc"]: "Plugin for sleeping.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "sleep",
  ["ops"]: {
    ["sleep"]: _core.dogma.use(require("./ops/sleep"))
  }
};