"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "inc",
  ["desc"]: "Plugin for incrementing a value.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "inc",
  ["ops"]: {
    ["inc"]: _core.dogma.use(require("./ops/inc"))
  }
};