"use strict";

var _core = require("@dogmalang/core");
const {
  PassThrough
} = _core.dogma.use(require("stream"));
const BlankSheet = _core.dogma.use(require("./BlankSheet"));
const $BlankSheetStream = class BlankSheetStream extends PassThrough {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_6854bf13ee7c2549dc0ed2293505cf65___init__ instanceof Function) this._pvt_6854bf13ee7c2549dc0ed2293505cf65___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6854bf13ee7c2549dc0ed2293505cf65___post__ instanceof Function) this._pvt_6854bf13ee7c2549dc0ed2293505cf65___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6854bf13ee7c2549dc0ed2293505cf65___validate__ instanceof Function) this._pvt_6854bf13ee7c2549dc0ed2293505cf65___validate__(); /* c8 ignore stop */
  }
};

const BlankSheetStream = new Proxy($BlankSheetStream, {
  apply(receiver, self, args) {
    return new $BlankSheetStream(...args);
  }
});
module.exports = exports = BlankSheetStream;
BlankSheetStream.prototype.append = function (blankSheet) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("blankSheet", blankSheet, BlankSheet);
  {
    this.write(_core.json.encode(blankSheet));
  }
  return this;
};