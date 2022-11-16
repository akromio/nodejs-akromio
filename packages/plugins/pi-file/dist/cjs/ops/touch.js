"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs/promises"));
module.exports = exports = {
  ["desc"]: "Changes the timestamps of a file.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: run
};
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    if (_core.dogma.is(args, _core.list)) {
      if ((0, _core.len)(args) == 2) {
        params = {
          ["path"]: _core.dogma.getItem(args, 0),
          ["atime"]: _core.dogma.getItem(args, 1).atime,
          ["mtime"]: _core.dogma.getItem(args, 1).mtime
        };
      } else {
        params = {
          ["path"]: _core.dogma.getItem(args, 0),
          ["atime"]: _core.dogma.getItem(args, 1),
          ["mtime"]: _core.dogma.getItem(args, 2)
        };
      }
    } else {
      params = args;
    }
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `file: changes the timestamps of '${params.path}'`;
  }
}
function run(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return fs.utimes(params.path, params.atime, params.mtime);
  }
}