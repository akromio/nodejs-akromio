"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "text",
  ["desc"]: "Plugin for working with text.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "concat",
  ["ops"]: {
    ["concat"]: _core.dogma.use(require("./ops/concat")),
    ["includes"]: _core.dogma.use(require("./ops/includes")),
    ["replace"]: _core.dogma.use(require("./ops/replace"))
  }
};