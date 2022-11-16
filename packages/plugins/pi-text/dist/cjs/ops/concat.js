"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Concatenates several values in a text.",
  ["parameterizer"]: buildParams,
  ["title"]: "text: concatenate values in a text",
  ["fun"]: handler
};
function buildParams(args) {
  {
    return _core.dogma.is(args, _core.list) ? args : [args];
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return params.join("");
  }
}