"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "fs",
  ["desc"]: "Plugin for performing operations with the file system.",
  ["tags"]: ["built-in"],
  ["ops"]: {
    ["chmod"]: _core.dogma.use(require("./ops/chmod")),
    ["copy"]: _core.dogma.use(require("./ops/copy")),
    ["createDir"]: _core.dogma.use(require("./ops/createDir")),
    ["emptyDir"]: _core.dogma.use(require("./ops/emptyDir")),
    ["exists"]: _core.dogma.use(require("./ops/exists")),
    ["move"]: _core.dogma.use(require("./ops/move")),
    ["remove"]: _core.dogma.use(require("./ops/remove"))
  }
};