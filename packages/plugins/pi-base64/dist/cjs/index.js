"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "base64",
  ["desc"]: "Plugin for working with base64.",
  ["tags"]: ["built-in"],
  ["ops"]: {
    ["encode"]: _core.dogma.use(require("./ops/encode")),
    ["decode"]: _core.dogma.use(require("./ops/decode"))
  }
};