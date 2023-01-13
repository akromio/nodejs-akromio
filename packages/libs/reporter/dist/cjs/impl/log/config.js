"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["print"]: _core.print,
  ["nestingLevel"]: 0,
  ["format"]: {
    ["start"]: "[$(ts)] [$(runner)] [$(id)] '$(title)'",
    ["end"]: "[$(ts)] [$(runner)] [$(id)] '$(title)' $(result) $(duration)"
  }
};