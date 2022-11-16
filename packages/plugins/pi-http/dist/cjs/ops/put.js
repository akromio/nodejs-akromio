"use strict";

var _core = require("@dogmalang/core");
const axios = _core.dogma.use(require("axios"));
const {
  buildParams
} = _core.dogma.use(require("./util"));
module.exports = exports = {
  ["desc"]: "Performs a PUT request.",
  ["parameterizer"]: buildParams,
  ["title"]: buildTitle,
  ["fun"]: handler
};
function buildTitle(params) {
  /* c8 ignore next */_core.dogma.expect("params", params);
  {
    return `http: put '${params.url}'`;
  }
}
function handler(ctx) {
  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
  let {
    params
  } = ctx;
  {
    var _params$opts;
    return axios.put(params.url, (_params$opts = params.opts) !== null && _params$opts !== void 0 ? _params$opts : {});
  }
}