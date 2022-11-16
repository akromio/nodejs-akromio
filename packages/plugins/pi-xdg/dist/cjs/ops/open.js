"use strict";

var _core = require("@dogmalang/core");
const open = _core.dogma.use(require("open"));
module.exports = exports = {
  ["desc"]: "Open a file with its default app.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handler
};
function buildParams(args) {
  let params;
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.text)) {
        {
          params = {
            ["target"]: args
          };
        }
      } else if (_core.dogma.is(_, _core.list)) {
        {
          params = {
            ["target"]: _core.dogma.getItem(args, 0),
            ["opts"]: _core.dogma.getItem(args, 1)
          };
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
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `xdg: open '${params.target}'`;
  }
}
/*c8 ignore next*/
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return open(params.target, params.opts);
  }
}