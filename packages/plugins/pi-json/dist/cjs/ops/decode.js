"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Decodes a JSON string.",
  ["title"]: "json: decode",
  ["fun"]: run
};
function run(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return _core.json.decode(params);
  }
}