"use strict";

var _core = require("@dogmalang/core");
const yaml = _core.dogma.use(require("yaml"));
module.exports = exports = {
  ["desc"]: "Decodes a YAML string.",
  ["title"]: "yaml: decode",
  ["fun"]: run
};
function run(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return yaml.parse(params);
  }
}