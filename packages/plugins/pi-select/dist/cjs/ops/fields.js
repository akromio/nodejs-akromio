"use strict";

var _core = require("@dogmalang/core");
const get = _core.dogma.use(require("lodash.get"));
module.exports = exports = {
  ["desc"]: "Selects one or more fields from an object.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handler
};
function buildParams(args) {
  let params = {};
  {
    params.object = _core.dogma.getItem(args, 0);
    params.fields = [];
    for (const arg of _core.dogma.getSlice(args, 1, -1)) {
      params.fields = params.fields.concat(arg);
    }
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    fields
  } = params;
  {
    return `select: fields ${fields.join(', ')}`;
  }
}
function handler(ctx) {
  let result = {}; /* c8 ignore next */
  _core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    const {
      object,
      fields
    } = params;
    for (const field of fields) {
      let [alias, path] = _core.dogma.getArrayToUnpack(field.split("="), 2);
      alias = alias.trim();
      if (path) {
        path = path.trim();
      } else {
        path = alias;
      }
      _core.dogma.setItem("=", result, alias, get(object, path));
    }
  }
  return result;
}