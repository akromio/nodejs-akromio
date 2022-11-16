"use strict";

var _core = require("@dogmalang/core");
const yaml = _core.dogma.use(require("yaml"));
module.exports = exports = {
  ["desc"]: "Appends an item at the end of a list.",
  ["title"]: "list: append item in the end",
  ["parameterizer"]: buildParams,
  ["fun"]: handler
};
function buildParams(args) {
  /* c8 ignore next */_core.dogma.expect("args", args);
  {
    return {
      ["item"]: _core.dogma.getItem(args, 0),
      ["list"]: _core.dogma.getItem(args, 1)
    };
  }
}
function handler(ctx) {
  let l = []; /* c8 ignore next */
  _core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    l = params.list;
    l.push(params.item);
  }
  return l;
}