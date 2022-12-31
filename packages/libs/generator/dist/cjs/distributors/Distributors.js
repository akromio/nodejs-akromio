"use strict";

var _core = require("@dogmalang/core");
const Distributor = _core.dogma.use(require("./Distributor"));
const $Distributors = class Distributors {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'distributors', {
      value: _core.dogma.expect('distributors', [], _core.dogma.TypeDef({
        name: 'inline',
        types: [Distributor],
        min: 0,
        max: null
      })),
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_6c34a6a2ea3f7e263e8f0b181544bcf3___init__ instanceof Function) this._pvt_6c34a6a2ea3f7e263e8f0b181544bcf3___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6c34a6a2ea3f7e263e8f0b181544bcf3___post__ instanceof Function) this._pvt_6c34a6a2ea3f7e263e8f0b181544bcf3___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6c34a6a2ea3f7e263e8f0b181544bcf3___validate__ instanceof Function) this._pvt_6c34a6a2ea3f7e263e8f0b181544bcf3___validate__(); /* c8 ignore stop */
  }
};

const Distributors = new Proxy($Distributors, {
  apply(receiver, self, args) {
    return new $Distributors(...args);
  }
});
module.exports = exports = Distributors;
Object.defineProperty(Distributors.prototype, "len", {
  enum: true,
  get: function () {
    const self = this;
    {
      return (0, _core.len)(this.distributors);
    }
  }
});
Distributors.prototype.append = function (distributor) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("distributor", distributor, Distributor);
  {
    this.distributors.push(distributor);
  }
  return this;
};
Distributors.prototype.start = function () {
  const self = this;
  {
    return Promise.all(this.distributors.map(d => d.start()));
  }
};