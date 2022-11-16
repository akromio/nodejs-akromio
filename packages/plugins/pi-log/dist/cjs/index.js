"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "log",
  ["desc"]: "Plugin for printing a value.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "info",
  ["ops"]: {
    ["info"]: _core.dogma.use(require("./ops/info"))
  }
};