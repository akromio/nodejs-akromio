"use strict";

var _core = require("@dogmalang/core");
const {
  Readable: ReadableStream
} = _core.dogma.use(require("stream"));
const JobCall = _core.dogma.use(require("./JobCall"));
const $JobCallStream = class JobCallStream extends ReadableStream {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_61dca16100d30b689c9bee411bebfe15___init__ instanceof Function) this._pvt_61dca16100d30b689c9bee411bebfe15___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_61dca16100d30b689c9bee411bebfe15___post__ instanceof Function) this._pvt_61dca16100d30b689c9bee411bebfe15___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_61dca16100d30b689c9bee411bebfe15___validate__ instanceof Function) this._pvt_61dca16100d30b689c9bee411bebfe15___validate__(); /* c8 ignore stop */
  }
};

const JobCallStream = new Proxy($JobCallStream, {
  apply(receiver, self, args) {
    return JobCallStream._pvt_61dca16100d30b689c9bee411bebfe15___factory__(...args);
  }
});
module.exports = exports = JobCallStream;
{
  const $$Class$$ = JobCallStream;
  JobCallStream._pvt_61dca16100d30b689c9bee411bebfe15___factory__ = JobCallStream._pvt_61dca16100d30b689c9bee411bebfe15_create = function (props = {}) {
    /* c8 ignore next */if (props != null) _core.dogma.expect("props", props, _core.map);
    {
      return new $$Class$$(_core.dogma.clone(props, {
        "objectMode": true
      }, {}, [], []));
    }
  };
  JobCallStream.prototype.append = function (call) {
    const self = this; /* c8 ignore next */
    _core.dogma.expect("call", call, JobCall);
    {
      this.push(call);
    }
    return this;
  };
  JobCallStream.prototype.end = function () {
    const self = this;
    {
      this.push(null);
    }
    return this;
  };
  JobCallStream.prototype._read = function () {
    const self = this;
    {
      _core.dogma.nop();
    }
  };
}