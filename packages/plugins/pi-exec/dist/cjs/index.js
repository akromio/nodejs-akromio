"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "exec",
  ["desc"]: "Plugin for executing commands from shell.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "command",
  ["ops"]: {
    ["command"]: _core.dogma.use(require("./ops/command")),
    ["log"]: _core.dogma.use(require("./ops/log"))
  }
};