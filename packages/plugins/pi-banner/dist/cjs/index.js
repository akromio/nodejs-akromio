"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "banner",
  ["desc"]: "Plugin for performing a banner.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "banner",
  ["ops"]: {
    ["banner"]: _core.dogma.use(require("./ops/banner"))
  }
};