"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "set",
  ["desc"]: "Plugin for setting a field value of an object",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "set",
  ["ops"]: {
    ["set"]: _core.dogma.use(require("./ops/set"))
  }
};