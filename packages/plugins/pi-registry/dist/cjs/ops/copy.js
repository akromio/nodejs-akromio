"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs/promises"));
module.exports = exports = {
  ["desc"]: "Writes the content of a registry item to a local file.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: handler
};
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    if (_core.dogma.is(args, _core.list)) {
      var _dogma$getItem;
      params = {
        ["itemPath"]: _core.dogma.getItem(args, 0),
        ["localPath"]: _core.dogma.getItem(args, 1),
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
    return `registry: copy '${params.itemPath}' to '${params.localPath}'`;
  }
}
async function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params,
    state
  } = ctx;
  {
    const {
      itemPath
    } = params;
    const item = (0, await state.registry.getItem(itemPath));
    if (!item) {
      _core.dogma.raise(`Item not found in registry: ${itemPath}.`);
    }
    return 0, await fs.writeFile(params.localPath, item.value, params.opts);
  }
}