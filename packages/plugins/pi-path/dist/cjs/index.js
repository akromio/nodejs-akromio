"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "path",
  ["desc"]: "Plugin for working with file system paths.",
  ["tags"]: ["built-in"],
  ["ops"]: {
    ["join"]: _core.dogma.use(require("./ops/join")),
    ["normalize"]: _core.dogma.use(require("./ops/normalize"))
  }
};