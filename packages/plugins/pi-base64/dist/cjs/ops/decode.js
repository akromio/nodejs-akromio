"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Decodes a base64 text.",
  ["parameterizer"]: buildParams,
  ["title"]: "base64: decode base64 text",
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
  }
  return params;
}
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return (0, _core.text)(Buffer.from(params.value, "base64"));
  }
}