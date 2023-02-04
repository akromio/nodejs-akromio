"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const fs = _core.dogma.use(require("fs-extra"));
module.exports = exports = {
  ["desc"]: "Ensures that a directory exists, creating it if needed.",
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
          var _dogma$getItem;
          params = {
            ["path"]: _core.dogma.getItem(args, 0),
            ["opts"]: (_dogma$getItem = _core.dogma.getItem(args, 1)) !== null && _dogma$getItem !== void 0 ? _dogma$getItem : {}
          };
        }
      } else {
        {
          params = args;
        }
      }
    }
    params.path = path.normalize(params.path);
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `fs: create dir '${params.path}' if not exists`;
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return fs.ensureDir(params.path, params.opts);
  }
}