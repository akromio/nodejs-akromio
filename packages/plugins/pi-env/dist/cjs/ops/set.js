"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Sets a environment variable.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handle
};
function buildParams(args) {
  /* c8 ignore next */_core.dogma.expect("args", args);
  {
    return {
      ["name"]: _core.dogma.getItem(args, 0),
      ["value"]: _core.dogma.getItem(args, 1)
    };
  }
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    name,
    value
  } = params;
  {
    return `env: set '${name}' to '${value}'`;
  }
}
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    _core.dogma.setItem("=", _core.ps.env, params.name, params.value);
    return _core.ps.env;
  }
}