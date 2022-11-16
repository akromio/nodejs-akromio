"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "env",
  ["desc"]: "Plugin for working environment variables.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "set",
  ["ops"]: {
    ["set"]: _core.dogma.use(require("./ops/set"))
  }
};