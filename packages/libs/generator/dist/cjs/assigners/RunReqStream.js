"use strict";

var _core = require("@dogmalang/core");
const {
  PassThrough
} = _core.dogma.use(require("stream"));
const RunReq = _core.dogma.use(require("./RunReq"));
const $RunReqStream = class RunReqStream extends PassThrough {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_bd3c204241eb47b56c518b76ff461a19___init__ instanceof Function) this._pvt_bd3c204241eb47b56c518b76ff461a19___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bd3c204241eb47b56c518b76ff461a19___post__ instanceof Function) this._pvt_bd3c204241eb47b56c518b76ff461a19___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bd3c204241eb47b56c518b76ff461a19___validate__ instanceof Function) this._pvt_bd3c204241eb47b56c518b76ff461a19___validate__(); /* c8 ignore stop */
  }
};

const RunReqStream = new Proxy($RunReqStream, {
  apply(receiver, self, args) {
    return RunReqStream._pvt_bd3c204241eb47b56c518b76ff461a19___factory__(...args);
  }
});
module.exports = exports = RunReqStream;
{
  const $$Class$$ = RunReqStream;
  RunReqStream._pvt_bd3c204241eb47b56c518b76ff461a19___factory__ = RunReqStream._pvt_bd3c204241eb47b56c518b76ff461a19_create = function () {
    {
      return new $$Class$$({
        ["readableObjectMode"]: true,
        ["writableObjectMode"]: true
      });
    }
  };
  RunReqStream.prototype.append = function (req) {
    const self = this; /* c8 ignore next */
    _core.dogma.expect("req", req, RunReq);
    {
      this.write(req);
    }
    return this;
  };
}