"use strict";

var _core = require("@dogmalang/core");
const Dataset = _core.dogma.use(require("./Dataset"));
const $GlobalDataset = class GlobalDataset extends Dataset {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_5870abe83b389c9080cdee9c4b83c545___init__ instanceof Function) this._pvt_5870abe83b389c9080cdee9c4b83c545___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_5870abe83b389c9080cdee9c4b83c545___post__ instanceof Function) this._pvt_5870abe83b389c9080cdee9c4b83c545___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_5870abe83b389c9080cdee9c4b83c545___validate__ instanceof Function) this._pvt_5870abe83b389c9080cdee9c4b83c545___validate__(); /* c8 ignore stop */
  }
};

const GlobalDataset = new Proxy($GlobalDataset, {
  apply(receiver, self, args) {
    return new $GlobalDataset(...args);
  }
});
module.exports = exports = GlobalDataset;