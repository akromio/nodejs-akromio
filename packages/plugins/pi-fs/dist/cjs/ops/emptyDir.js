"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs-extra"));
module.exports = exports = {
  ["desc"]: "Clears a directory.",
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
      if (_core.dogma.is(_, _core.text)) {
        {
          params = {
            ["path"]: args
          };
        }
      } else if (_core.dogma.is(_, _core.list)) {
        {
          params = {
            ["path"]: _core.dogma.getItem(args, 0)
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
    return `fs: empty dir '${params.path}' if exists`;
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return fs.emptyDir(params.path);
  }
}