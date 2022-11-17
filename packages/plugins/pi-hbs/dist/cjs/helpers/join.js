"use strict";

var _core = require("@dogmalang/core");
function join(...args) {
  {
    return _core.dogma.getItem(args, 0).join(_core.dogma.is(_core.dogma.getItem(args, 1), _core.text) ? _core.dogma.getItem(args, 1) : ", ");
  }
}
module.exports = exports = join;