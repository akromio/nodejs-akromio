"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "udp",
  ["desc"]: "Plugin for working with UDP.",
  ["tags"]: ["builtin", "net", "udp"],
  ["ops"]: {
    ["send"]: _core.dogma.use(require("./ops/send"))
  }
};