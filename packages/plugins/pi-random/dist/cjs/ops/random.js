"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Generates a pseudo-random number.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: handle
};
function buildParams(args) {
  let params = {};
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          params.start = _core.dogma.getItem(args, 0);
          params.stop = _core.dogma.getItem(args, 1);
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
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    start,
    stop
  } = params;
  {
    return `random: pseudo-random number between ${start} and ${stop}`;
  }
}
function handle(ctx) {
  let random = 0; /* c8 ignore next */
  _core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    const start = (0, _core.num)(params.start);
    const stop = (0, _core.num)(params.stop);
    const len = stop - start;
    random = Math.ceil(Math.random() * len) + start;
  }
  return random;
}