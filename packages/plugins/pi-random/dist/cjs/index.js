"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "random",
  ["desc"]: "Plugin for working with pseudo-random numbers.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "random",
  ["ops"]: {
    ["random"]: _core.dogma.use(require("./ops/random")),
    ["text"]: _core.dogma.use(require("./ops/text"))
  }
};