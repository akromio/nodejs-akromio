"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Returns a list with a sequence of numbers between given two.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: handler
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
      } else {
        {
          params = {
            ["start"]: _core.dogma.getItem(args, 0),
            ["stop"]: _core.dogma.getItem(args, 1)
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
    start,
    stop
  } = params;
  {
    return `range: [${start}, ${stop}]`;
  }
}
function handler(ctx) {
  let seq = []; /* c8 ignore next */
  _core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    for (let i = params.start; i <= params.stop; i += 1) {
      seq.push(i);
    }
  }
  return seq;
}