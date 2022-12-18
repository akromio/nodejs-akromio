"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Sleeps.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: handle
};
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.map)) {
        {
          params = args;
        }
      } else if (_core.dogma.is(_, _core.text)) {
        {
          params = {
            ["duration"]: args
          };
        }
      } else {
        {
          params = {
            ["duration"]: _core.dogma.getItem(args, 0)
          };
        }
      }
    }
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    duration
  } = params;
  {
    return `sleep: for '${duration}'`;
  }
}
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return (0, _core.sleep)(params.duration);
  }
}