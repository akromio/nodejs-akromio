"use strict";

var _core = require("@dogmalang/core");
const yaml = _core.dogma.use(require("yaml"));
module.exports = exports = {
  ["desc"]: "Creates a list with the given items.",
  ["title"]: "list: create data list",
  ["parameterizer"]: buildParams,
  ["fun"]: handler
};
function buildParams(args) {
  let l = [];
  {
    if (args !== undefined) {
      if (_core.dogma.is(args, _core.list)) {
        l = args;
      } else {
        l.push(args);
      }
    }
  }
  return l;
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return (0, _core.list)(params);
  }
}