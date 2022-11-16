"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["desc"]: "Prints a value.",
  ["title"]: "log: print a value",
  ["fun"]: run
};
function run(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params,
    log
  } = ctx;
  {
    log(params);
  }
}