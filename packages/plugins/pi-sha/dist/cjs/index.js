"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "sha",
  ["desc"]: "Plugin for generating hashes with SHA.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "generate",
  ["ops"]: {
    ["generate"]: _core.dogma.use(require("./ops/generate"))
  }
};