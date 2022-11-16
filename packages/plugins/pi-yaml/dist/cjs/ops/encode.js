"use strict";

var _core = require("@dogmalang/core");
const yaml = _core.dogma.use(require("yaml"));
module.exports = exports = {
  ["desc"]: "Encodes a value to a YAML text/string.",
  ["title"]: "yaml: encode",
  ["fun"]: run
};
const opts = {
  ["indent"]: 2,
  ["schema"]: "core"
};
function run(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return yaml.stringify(params, opts);
  }
}