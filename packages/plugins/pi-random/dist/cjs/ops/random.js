"use strict";

var _core = require("@dogmalang/core");
const random = _core.dogma.use(require("./_random"));
module.exports = exports = {
  ["desc"]: "Generates a pseudo-random number.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: handle
};
function buildParams(args) {
  let params = {};
  {
    let start;
    let stop;
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          [start, stop] = _core.dogma.getArrayToUnpack(args, 2);
        }
      } else {
        {
          ({
            start: start,
            stop: stop
          } = args);
        }
      }
    }
    _core.dogma.update(params, {
      name: "start",
      visib: ".",
      assign: "=",
      value: (0, _core.num)(start)
    }, {
      name: "stop",
      visib: ".",
      assign: "=",
      value: (0, _core.num)(stop)
    });
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
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return random(params.start, params.stop);
  }
}