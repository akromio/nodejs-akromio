"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Returns an item from a list randomly.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handle
};
function buildParams(args) {
  let params = {};
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          if ((0, _core.len)(args) == 1 && _core.dogma.is(_core.dogma.getItem(args, 0), _core.list)) {
            params.array = _core.dogma.getItem(args, 0);
          } else {
            params.array = args;
          }
        }
      } else {
        {
          params = args;
        }
      }
    }
    if (_core.dogma.isNot(params.array, _core.list)) {
      _core.dogma.raise(TypeError("random.from: array expected."));
    }
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    array
  } = params;
  {
    return `random: from list with len ${(0, _core.len)(array)}`;
  }
}
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    const {
      array
    } = params;
    const i = Math.floor(Math.random() * (0, _core.len)(array));
    return _core.dogma.getItem(array, i);
  }
}