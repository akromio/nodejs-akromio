"use strict";

var _core = require("@dogmalang/core");
const {
  PassThrough
} = _core.dogma.use(require("stream"));
const $BlankSheetStream = class BlankSheetStream extends PassThrough {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_1a9cd3f4ca026ec90eb886f3aaebc873___init__ instanceof Function) this._pvt_1a9cd3f4ca026ec90eb886f3aaebc873___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1a9cd3f4ca026ec90eb886f3aaebc873___post__ instanceof Function) this._pvt_1a9cd3f4ca026ec90eb886f3aaebc873___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1a9cd3f4ca026ec90eb886f3aaebc873___validate__ instanceof Function) this._pvt_1a9cd3f4ca026ec90eb886f3aaebc873___validate__(); /* c8 ignore stop */
  }
};

const BlankSheetStream = new Proxy($BlankSheetStream, {
  apply(receiver, self, args) {
    return new $BlankSheetStream(...args);
  }
});
module.exports = exports = BlankSheetStream;
BlankSheetStream.prototype.appendBlankSheet = function () {
  const self = this;
  {
    this.write("bs");
  }
  return this;
};