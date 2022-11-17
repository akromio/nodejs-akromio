"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "hbs",
  ["desc"]: "Plugin for working with Handlebars.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "render",
  ["ops"]: {
    ["render"]: _core.dogma.use(require("./ops/render"))
  }
};