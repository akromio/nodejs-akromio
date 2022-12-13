"use strict";

var _core = require("@dogmalang/core");
function buildParams(args) {
  let params = {};
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          if ((0, _core.len)(args) == 2 && _core.dogma.is(_core.dogma.getItem(args, -1), _core.map)) {
            params.command = _core.dogma.getItem(args, 0);
            params.opts = _core.dogma.getItem(args, 1);
          } else {
            params.command = args.join(" ");
            params.opts = {};
          }
        }
      } else if (_core.dogma.is(_, _core.text)) {
        {
          params.command = args;
          params.opts = {};
        }
      } else {
        {
          params = args;
        }
      }
    }
  }
  return params;
}
module.exports = exports = buildParams;