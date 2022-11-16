"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildParams = buildParams;
var _core = require("@dogmalang/core");
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    {
      const _ = args; /*c8 ignore else*/
      if (_core.dogma.is(_, _core.text)) {
        {
          params = {
            ["url"]: args
          };
        }
      } else if (_core.dogma.is(_, _core.list)) {
        {
          params = {
            ["url"]: _core.dogma.getItem(args, 0),
            ["opts"]: _core.dogma.getItem(args, 1)
          };
        }
      }
    }
  }
  return params;
}