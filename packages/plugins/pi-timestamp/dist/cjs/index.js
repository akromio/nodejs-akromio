"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "timestamp",
  ["desc"]: "Plugin for working with timestamps.",
  ["tags"]: ["built-in"],
  ["ops"]: {
    ["now"]: _core.dogma.use(require("./ops/now"))
  }
};