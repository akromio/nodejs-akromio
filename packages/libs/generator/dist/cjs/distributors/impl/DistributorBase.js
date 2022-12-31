"use strict";

var _core = require("@dogmalang/core");
const {
  Readable
} = _core.dogma.use(require("stream"));
const $DistributorBase = class DistributorBase {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('input', _['input'], Readable);
    Object.defineProperty(this, 'input', {
      value: (0, _core.coalesce)(_['input'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_782027ffca01839382faaee3eb59acc1___init__ instanceof Function) this._pvt_782027ffca01839382faaee3eb59acc1___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_782027ffca01839382faaee3eb59acc1___post__ instanceof Function) this._pvt_782027ffca01839382faaee3eb59acc1___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_782027ffca01839382faaee3eb59acc1___validate__ instanceof Function) this._pvt_782027ffca01839382faaee3eb59acc1___validate__(); /* c8 ignore stop */
  }
};

const DistributorBase = new Proxy($DistributorBase, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'DistributorBase' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = DistributorBase;
DistributorBase.prototype.start = async function () {
  const self = this;
  try {
    0, await this.connect();
    for await (const req of this.input) {
      this.deliver(req);
    }
  } finally {
    this.disconnect();
  }
};
DistributorBase.prototype.connect = function () {
  const self = this;
  {
    _core.dogma.nop();
  }
};
DistributorBase.prototype.disconnect = function () {
  const self = this;
  {
    _core.dogma.nop();
  }
};
/* c8 ignore start */
DistributorBase.prototype.deliver = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */