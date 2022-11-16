"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs/promises"));
module.exports = exports = {
  ["desc"]: "Reads the content of a file.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: run
};
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.text)) {
        {
          params = {
            ["path"]: args,
            ["opts"]: {}
          };
        }
      } else if (_core.dogma.is(_, _core.list)) {
        {
          var _dogma$getItem;
          params = {
            ["path"]: _core.dogma.getItem(args, 0),
            ["opts"]: (_dogma$getItem = _core.dogma.getItem(args, 1)) !== null && _dogma$getItem !== void 0 ? _dogma$getItem : {}
          };
        }
      } else {
        {
          params = args;
        }
      }
    }
  }
  return params;
}
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `file: read content of '${params.path}'`;
  }
}
function run(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return fs.readFile(params.path, params.opts);
  }
}