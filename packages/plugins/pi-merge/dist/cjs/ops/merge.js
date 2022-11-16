"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Merges several objects in one.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handler
};
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          params.values = args;
        }
      } else {
        {
          params.values = [args];
        }
      }
    }
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `merge: ${(0, _core.len)(params.values)} objects`;
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return Object.assign({}, ...params.values);
  }
}