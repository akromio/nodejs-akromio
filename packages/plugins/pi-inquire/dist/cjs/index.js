"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "inquire",
  ["desc"]: "Plugin for doing questions to the user.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "prompt",
  ["ops"]: {
    ["prompt"]: _core.dogma.use(require("./ops/prompt"))
  }
};