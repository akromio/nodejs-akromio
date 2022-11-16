"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "xdg",
  ["desc"]: "Plugin for opening files with the default apps.",
  ["tags"]: ["built-in"],
  ["ops"]: {
    ["open"]: _core.dogma.use(require("./ops/open"))
  }
};