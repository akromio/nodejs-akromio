"use strict";

var _core = require("@dogmalang/core");
const {
  Readable: ReadableStream
} = _core.dogma.use(require("stream"));
const CallReq = _core.dogma.use(require("./CallReq"));
const $CallReqStream = class CallReqStream extends ReadableStream {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_9c1772ebc121c20f46b4c18056996dfb___init__ instanceof Function) this._pvt_9c1772ebc121c20f46b4c18056996dfb___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9c1772ebc121c20f46b4c18056996dfb___post__ instanceof Function) this._pvt_9c1772ebc121c20f46b4c18056996dfb___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_9c1772ebc121c20f46b4c18056996dfb___validate__ instanceof Function) this._pvt_9c1772ebc121c20f46b4c18056996dfb___validate__(); /* c8 ignore stop */
  }
};

const CallReqStream = new Proxy($CallReqStream, {
  apply(receiver, self, args) {
    return CallReqStream._pvt_9c1772ebc121c20f46b4c18056996dfb___factory__(...args);
  }
});
module.exports = exports = CallReqStream;
{
  const $$Class$$ = CallReqStream;
  CallReqStream._pvt_9c1772ebc121c20f46b4c18056996dfb___factory__ = CallReqStream._pvt_9c1772ebc121c20f46b4c18056996dfb_create = function (props = {}) {
    /* c8 ignore next */if (props != null) _core.dogma.expect("props", props, _core.map);
    {
      return new $$Class$$(_core.dogma.clone(props, {
        "objectMode": true
      }, {}, [], []));
    }
  };
  CallReqStream.prototype.append = function (req) {
    const self = this; /* c8 ignore next */
    _core.dogma.expect("req", req, CallReq);
    {
      this.push(req);
    }
    return this;
  };
  CallReqStream.prototype.end = function () {
    const self = this;
    {
      this.push(null);
    }
    return this;
  };
  CallReqStream.prototype._read = function () {
    const self = this;
    {
      _core.dogma.nop();
    }
  };
}