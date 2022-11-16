"use strict";

var _core = require("@dogmalang/core");
const {
  webcrypto
} = _core.dogma.use(require("crypto"));
module.exports = exports = {
  ["desc"]: "Generates a hash with SHA.",
  ["title"]: buildTitle,
  ["parameterizer"]: buildParams,
  ["fun"]: handler
};
const defaultAlgorithm = "SHA-512";
const digest = (0, _core.bind)(webcrypto.subtle, "digest");
const encoder = new TextEncoder();
function buildParams(args) {
  let params = {}; /* c8 ignore next */
  _core.dogma.expect("args", args);
  {
    {
      const _ = args;
      if (_core.dogma.is(_, _core.map)) {
        {
          params = args;
        }
      } else if (_core.dogma.is(_, _core.list)) {
        {
          params = {
            ["data"]: _core.dogma.getItem(args, 0),
            ["algorithm"]: _core.dogma.getItem(args, 1)
          };
        }
      } else {
        {
          params = {
            ["data"]: args
          };
        }
      }
    }
  }
  return params;
}
function buildTitle(params) {
  let title = ""; /* c8 ignore next */
  _core.dogma.expect("params", params, _core.map);
  let {
    algorithm
  } = params;
  {
    var _algorithm;
    algorithm = (_algorithm = algorithm) !== null && _algorithm !== void 0 ? _algorithm : defaultAlgorithm;
    title = `sha: generate hash with '${algorithm}'`;
  }
  return title;
}
async function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    var _params$algorithm;
    return Buffer.from((0, await digest((_params$algorithm = params.algorithm) !== null && _params$algorithm !== void 0 ? _params$algorithm : defaultAlgorithm, encoder.encode(params.data)))).toString("hex");
  }
}