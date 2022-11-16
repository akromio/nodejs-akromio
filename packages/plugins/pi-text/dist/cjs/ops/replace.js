"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Replaces a text with other.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handler
};
function buildParams(args) {
  let params;
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.list)) {
        {
          params = {
            ["str"]: _core.dogma.getItem(args, 0),
            ["substr"]: _core.dogma.getItem(args, 1),
            ["newSubstr"]: _core.dogma.getItem(args, 2)
          };
        }
      } else if (_core.dogma.is(_, _core.map)) {
        {
          params = args;
        }
      }
    }
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params, _core.map);
  let {
    substr,
    newSubstr
  } = params;
  {
    return `text: replace '${substr}' by '${newSubstr}'`;
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return params.str.replace(params.substr, params.newSubstr);
  }
}