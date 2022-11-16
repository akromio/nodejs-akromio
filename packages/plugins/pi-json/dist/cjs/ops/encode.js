"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Encodes a value to a JSON text/string.",
  ["title"]: "json: encode",
  ["fun"]: run
};
function run(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return _core.json.encode(params);
  }
}