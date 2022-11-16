"use strict";

var _core = require("@dogmalang/core");
const merge = _core.dogma.use(require("deepmerge"));
const base = _core.dogma.use(require("./merge"));
module.exports = exports = {
  ["desc"]: "Merges recursively several objects in one.",
  ["parameterizer"]: base.parameterizer,
  ["title"]: buildTitle,
  ["fun"]: handler
};
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `merge: recursively ${(0, _core.len)(params.values)} objects`;
  }
}
function handler(ctx) {
  let merged = {}; /* c8 ignore next */
  _core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    for (const value of params.values) {
      merged = merge(merged, value);
    }
  }
  return merged;
}