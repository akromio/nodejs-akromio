"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "list",
  ["desc"]: "Plugin for working with lists.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "create",
  ["ops"]: {
    ["append"]: _core.dogma.use(require("./ops/append")),
    ["create"]: _core.dogma.use(require("./ops/create")),
    ["join"]: _core.dogma.use(require("./ops/join"))
  }
};