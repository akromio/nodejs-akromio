"use strict";

var _core = require("@dogmalang/core");
const setValue = _core.dogma.use(require("lodash.set"));
module.exports = exports = {
  ["desc"]: "Sets a field value of an object.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handler
};
function buildParams(args) {
  {
    return {
      ["object"]: _core.dogma.getItem(args, 0),
      ["field"]: _core.dogma.getItem(args, 1),
      ["value"]: _core.dogma.getItem(args, 2)
    };
  }
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    field
  } = params;
  {
    return `set: ${field}`;
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return setValue(params.object, params.field, params.value);
  }
}