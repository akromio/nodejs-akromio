"use strict";

var _core = require("@dogmalang/core");
module.exports = exports = {
  ["plugin"]: "registry",
  ["desc"]: "Plugin for working with registries.",
  ["tags"]: ["built-in"],
  ["defaultOpName"]: "getItem",
  ["ini"]: initialize,
  ["fin"]: finalize,
  ["ops"]: {
    ["getItem"]: _core.dogma.use(require("./ops/getItem")),
    ["copy"]: _core.dogma.use(require("./ops/copy"))
  }
};
async function initialize(args) {
  let state = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    if (_core.dogma.is(args, "Registry")) {
      state.builtIn = true;
      state.registry = args;
    }
  }
  return state;
}
function finalize(state) {
  /* c8 ignore next */_core.dogma.expect("state", state);
  {
    if (!state.builtIn) {
      state.registry.disconnect();
    }
  }
}