"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs-extra"));
module.exports = exports = {
  ["desc"]: "Move a fs entry.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: run
};
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          params = {
            ["src"]: _core.dogma.getItem(args, 0),
            ["dst"]: _core.dogma.getItem(args, 1),
            ["opts"]: _core.dogma.getItem(args, 2)
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
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    src,
    dst
  } = params;
  {
    return `fs: move '${src}' to '${dst}'`;
  }
}
function run(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    var _params$opts;
    return fs.move(params.src, params.dst, (_params$opts = params.opts) !== null && _params$opts !== void 0 ? _params$opts : {});
  }
}