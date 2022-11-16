"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "file",
  ["desc"]: "Plugin for performing operations with files.",
  ["tags"]: ["built-in"],
  ["ops"]: {
    ["append"]: _core.dogma.use(require("./ops/append")),
    ["chmod"]: _core.dogma.use(require("./ops/chmod")),
    ["chown"]: _core.dogma.use(require("./ops/chown")),
    ["isReadable"]: _core.dogma.use(require("./ops/isReadable")),
    ["read"]: _core.dogma.use(require("./ops/read")),
    ["remove"]: _core.dogma.use(require("./ops/remove")),
    ["touch"]: _core.dogma.use(require("./ops/touch")),
    ["write"]: _core.dogma.use(require("./ops/write"))
  }
};