"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs/promises"));
module.exports = exports = {
  ["desc"]: "Appends content to a file.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: run
};
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    if (_core.dogma.is(args, _core.list)) {
      var _dogma$getItem;
      params = {
        ["content"]: _core.dogma.getItem(args, 0),
        ["path"]: _core.dogma.getItem(args, 1),
        ["opts"]: (_dogma$getItem = _core.dogma.getItem(args, 2)) !== null && _dogma$getItem !== void 0 ? _dogma$getItem : {}
      };
    } else {
      params = args;
    }
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `file: append content to '${params.path}'`;
  }
}
function run(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return fs.appendFile(params.path, params.content, params.opts);
  }
}