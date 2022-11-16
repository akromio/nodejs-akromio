"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs/promises"));
const {
  constants
} = _core.dogma.use(require("fs"));
module.exports = exports = {
  ["desc"]: "Checks whether a filesystem entry is readable.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: handler
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
            ["path"]: args
          };
        }
      } else if (_core.dogma.is(_, _core.list)) {
        {
          params = {
            ["path"]: _core.dogma.getItem(args, 0)
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
    return `fs: check whether '${params.path}' is readable`;
  }
}
async function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return _core.dogma.getItem(await _core.dogma.pawait(() => fs.access(params.path, constants.R_OK)), 0);
  }
}