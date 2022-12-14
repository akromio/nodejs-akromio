"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Prints a value.",
  ["title"]: "log: print a value",
  ["fun"]: handle
};
function handle(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params,
    log
  } = ctx;
  {
    if (_core.dogma.is(params, _core.list)) {
      params = params.join(" ");
    }
    log(params);
  }
}