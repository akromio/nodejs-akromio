"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "merge",
  ["desc"]: "Plugin for merging several objects in one.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "merge",
  ["ops"]: {
    ["deep"]: _core.dogma.use(require("./ops/deep")),
    ["merge"]: _core.dogma.use(require("./ops/merge"))
  }
};