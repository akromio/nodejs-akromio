"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "http",
  ["desc"]: "Plugin for performing HTTP requests.",
  ["tags"]: ["built-in"],
  ["ops"]: {
    ["delete"]: _core.dogma.use(require("./ops/delete")),
    ["get"]: _core.dogma.use(require("./ops/get")),
    ["head"]: _core.dogma.use(require("./ops/head")),
    ["options"]: _core.dogma.use(require("./ops/options")),
    ["patch"]: _core.dogma.use(require("./ops/patch")),
    ["post"]: _core.dogma.use(require("./ops/post")),
    ["put"]: _core.dogma.use(require("./ops/put"))
  }
};