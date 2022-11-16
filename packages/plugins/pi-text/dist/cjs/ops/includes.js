"use strict";

var _core = require("@dogmalang/core");
const {
  parameterizer
} = _core.dogma.use(require("./concat"));
module.exports = exports = {
  ["desc"]: "Checks whether a text contains other.",
  ["parameterizer"]: parameterizer,
  ["title"]: "text: check if including",
  ["fun"]: handler
};
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    return _core.dogma.getItem(params, 0).includes(_core.dogma.getItem(params, 1));
  }
}