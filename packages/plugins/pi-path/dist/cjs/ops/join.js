"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
module.exports = exports = {
  ["desc"]: "Joins all segments of a path.",
  ["title"]: "path: join path segments",
  ["parameterizer"]: buildParams,
  ["fun"]: handler
};
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    if (_core.dogma.is(args, _core.list)) {
      params = {
        ["segments"]: args
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
    return path.join(...params.segments);
  }
}