"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "json",
  ["desc"]: "Plugin for encoding/decoding JSON.",
  ["tags"]: ["built-in"],
  ["ops"]: {
    ["encode"]: _core.dogma.use(require("./ops/encode")),
    ["decode"]: _core.dogma.use(require("./ops/decode"))
  }
};