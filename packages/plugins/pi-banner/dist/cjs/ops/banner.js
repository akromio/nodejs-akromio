"use strict";

var _core = require("@dogmalang/core");
const chalk = _core.dogma.use(require("chalk"));
module.exports = exports = {
  ["desc"]: "Performs a banner.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: _core.dogma.nop()
};
function buildParams(args) {
  /* c8 ignore next */_core.dogma.expect("args", args);
  {
    return {
      ["value"]: args
    };
  }
}
function buildTitle(params) {
  let title = ""; /* c8 ignore next */
  _core.dogma.expect("params", params, _core.dogma.intf("inline", {
    value: {
      optional: false,
      type: null
    }
  }));
  let {
    value
  } = params;
  {
    if (_core.dogma.is(value, _core.list)) {
      value = value.join(" ");
    }
    title = `banner: ${chalk.underline.bold(value)}`;
  }
  return title;
}