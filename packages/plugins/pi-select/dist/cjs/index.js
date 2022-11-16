"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "select",
  ["desc"]: "Plugin for selecting fields from an object",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "fields",
  ["ops"]: {
    ["fields"]: _core.dogma.use(require("./ops/fields")),
    ["value"]: _core.dogma.use(require("./ops/value"))
  }
};