"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs/promises"));
module.exports = exports = {
  ["desc"]: "Changes the ownership of a file.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: run
};
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    if (_core.dogma.is(args, _core.list)) {
      const [uid, gid] = _core.dogma.getArrayToUnpack(_core.dogma.getItem(args, 0).split(":"), 2);
      params = {
        ["uid"]: uid,
        ["gid"]: gid,
        ["path"]: _core.dogma.getItem(args, 1)
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
    return `file: changes ownership of '${params.path}' to '${params.uid}:${params.gid}'`;
  }
}
function run(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return fs.chown(params.path, params.uid, params.gid);
  }
}