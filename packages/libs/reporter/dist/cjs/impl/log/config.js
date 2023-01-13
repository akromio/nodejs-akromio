"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["print"]: _core.print,
  ["format"]: {
    ["start"]: "[$(ts)] [$(runner)] [$(id)] '$(title)'",
    ["end"]: "[$(ts)] [$(runner)] [$(id)] $(result) $(duration)"
  }
};