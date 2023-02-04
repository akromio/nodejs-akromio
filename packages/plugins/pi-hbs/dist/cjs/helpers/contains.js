"use strict";

var _core = require("@dogmalang/core");
function join(...args) {
  {
    return _core.dogma.includes(_core.dogma.getItem(args, 0), _core.dogma.getItem(args, 1));
  }
}
module.exports = exports = join;