"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Returns an item from the registry.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handler
};
function buildParams(args) {
  {
    return {
      ["itemPath"]: args
    };
  }
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `registry: get ${params.itemPath}`;
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params,
    state
  } = ctx;
  {
    return state.registry.getItem(params.itemPath);
  }
}