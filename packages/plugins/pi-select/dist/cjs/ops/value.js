"use strict";

var _core = require("@dogmalang/core");
const get = _core.dogma.use(require("lodash.get"));
module.exports = exports = {
  ["desc"]: "Selects field value from an object.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handler
};
function buildParams(args) {
  {
    return {
      ["object"]: _core.dogma.getItem(args, 0),
      ["field"]: _core.dogma.expect('dogma.getItem(args, 1)', _core.dogma.getItem(args, 1), _core.text)
    };
  }
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    field
  } = params;
  {
    return `select: value ${field}`;
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return get(params.object, params.field);
  }
}