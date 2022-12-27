"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Encodes a value to base64.",
  ["parameterizer"]: buildParams,
  ["title"]: "base64: encode value",
  ["fun"]: handle
};
function buildParams(args) {
  let params = {};
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          params.value = _core.dogma.getItem(args, 0);
        }
      } else if (_core.dogma.is(_, _core.text)) {
        {
          params.value = args;
        }
      } else {
        {
          params = args;
        }
      }
    }
    if (_core.dogma.isNot(params.value, _core.text)) {
      params.value = (0, _core.fmt)(params.value);
    }
  }
  return params;
}
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return Buffer.from(params.value).toString("base64");
  }
}