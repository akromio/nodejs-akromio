"use strict";

var _core = require("@dogmalang/core");
const yaml = _core.dogma.use(require("yaml"));
module.exports = exports = {
  ["desc"]: "Returns a text with all the items separated by some text.",
  ["title"]: "list: join items",
  ["parameterizer"]: buildParams,
  ["fun"]: handler
};
function buildParams(args) {
  /* c8 ignore next */_core.dogma.expect("args", args);
  {
    return Object.assign({}, {
      ["list"]: _core.dogma.getItem(args, 0)
    }, _core.dogma.getItem(args, 1) ? {
      ["separator"]: _core.dogma.getItem(args, 1)
    } : {});
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    var _params$separator;
    return params.list.join((_params$separator = params.separator) !== null && _params$separator !== void 0 ? _params$separator : ", ");
  }
}