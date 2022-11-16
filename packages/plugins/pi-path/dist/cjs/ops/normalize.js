"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
module.exports = exports = {
  ["desc"]: "Normalizes a path, resolving '.' and '..'.",
  ["title"]: "path: normalize path",
  ["parameterizer"]: buildParams,
  ["fun"]: handler
};
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    if (_core.dogma.is(args, _core.text)) {
      params = {
        ["path"]: args
      };
    } else {
      params = args;
    }
  }
  return params;
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return path.normalize(params.path);
  }
}