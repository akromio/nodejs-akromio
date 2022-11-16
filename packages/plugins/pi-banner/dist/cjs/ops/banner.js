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
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `banner: ${chalk.underline.bold(params.value)}`;
  }
}