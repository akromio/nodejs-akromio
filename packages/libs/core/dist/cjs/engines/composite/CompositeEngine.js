"use strict";

var _core = require("@dogmalang/core");
const {
  Readable
} = _core.dogma.use(require("stream"));
const Engine = _core.dogma.use(require("../Engine"));
const Runner = _core.dogma.use(require("../Runner"));
const $CompositeEngine = class CompositeEngine extends Engine {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('stream', _['stream'], Readable);
    Object.defineProperty(this, 'stream', {
      value: (0, _core.coalesce)(_['stream'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('runners', _['runners'], _core.dogma.TypeDef({
      name: 'inline',
      types: [Runner],
      min: 0,
      max: null
    }));
    Object.defineProperty(this, 'runners', {
      value: (0, _core.coalesce)(_['runners'], null),
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_023e4010e6584f54c4c2cb0c6edf91ac___init__ instanceof Function) this._pvt_023e4010e6584f54c4c2cb0c6edf91ac___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_023e4010e6584f54c4c2cb0c6edf91ac___post__ instanceof Function) this._pvt_023e4010e6584f54c4c2cb0c6edf91ac___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_023e4010e6584f54c4c2cb0c6edf91ac___validate__ instanceof Function) this._pvt_023e4010e6584f54c4c2cb0c6edf91ac___validate__(); /* c8 ignore stop */
  }
};

const CompositeEngine = new Proxy($CompositeEngine, {
  apply(receiver, self, args) {
    return new $CompositeEngine(...args);
  }
});
module.exports = exports = CompositeEngine;
CompositeEngine.prototype.run = function () {
  const self = this;
  {
    return Promise.all(this.runners.map(runner => this.startRunner(runner)));
  }
};
CompositeEngine.prototype.startRunner = async function (runner) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("runner", runner, Runner);
  {
    const {
      stream,
      dataset,
      onError
    } = this;
    for await (const req of stream) {
      {
        const op = this.getOpOf(req);
        if (op) {
          0, await runner.run(op, req.args, {
            'dataset': dataset,
            'onError': onError
          });
        }
      }
    }
  }
};