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
    if (_['dataRecollectors'] != null) (0, _core.expect)('dataRecollectors', _['dataRecollectors'], _core.dogma.TypeDef({
      name: 'inline',
      types: [_core.func],
      min: 0,
      max: null
    })); /* c8 ignore stop */
    Object.defineProperty(this, 'dataRecollectors', {
      value: (0, _core.coalesce)(_['dataRecollectors'], []),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
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
  CallReqStream.prototype.appendCallReq = function (req) {
    const self = this; /* c8 ignore next */
    _core.dogma.expect("req", req, CallReq);
    {
      this.push(req);
    }
    return this;
  };
  CallReqStream.prototype.appendDataRecollector = function (recollector) {
    const self = this; /* c8 ignore next */
    _core.dogma.expect("recollector", recollector, _core.func);
    {
      this.dataRecollectors.push(recollector);
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
  CallReqStream.prototype._read = function (size) {
    const self = this; /* c8 ignore next */
    _core.dogma.expect("size", size);
    {
      for (const gather of this.dataRecollectors) {
        _core.dogma.peval(() => {
          return gather(size);
        });
      }
    }
  };
}