"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Returns a value incremented.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handler
};
function buildParams(args) {
  {
    return {
      ["value"]: args
    };
  }
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `inc: value ${params.value}`;
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    var _params$value;
    return ((_params$value = params.value) !== null && _params$value !== void 0 ? _params$value : 0) + 1;
  }
}