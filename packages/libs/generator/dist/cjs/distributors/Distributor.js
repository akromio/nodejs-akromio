"use strict";

var _core = require("@dogmalang/core");
const {
  Readable
} = _core.dogma.use(require("stream"));
const Ring = _core.dogma.use(require("./ring/Ring"));
const $Distributor = class Distributor {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('ring', _['ring'], Ring);
    Object.defineProperty(this, 'ring', {
      value: (0, _core.coalesce)(_['ring'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('input', _['input'], Readable);
    Object.defineProperty(this, 'input', {
      value: (0, _core.coalesce)(_['input'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_290228c99a43683be85549fa6fb11332___init__ instanceof Function) this._pvt_290228c99a43683be85549fa6fb11332___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_290228c99a43683be85549fa6fb11332___post__ instanceof Function) this._pvt_290228c99a43683be85549fa6fb11332___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_290228c99a43683be85549fa6fb11332___validate__ instanceof Function) this._pvt_290228c99a43683be85549fa6fb11332___validate__(); /* c8 ignore stop */
  }
};

const Distributor = new Proxy($Distributor, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Distributor' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Distributor;
Distributor.prototype.start = async function () {
  const self = this;
  const {
    ring,
    input
  } = self;
  {
    for await (const req of input) {
      this.deliver(req, ring.next());
    }
  }
};
/* c8 ignore start */
Distributor.prototype.deliver = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */