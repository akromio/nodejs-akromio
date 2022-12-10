"use strict";

var _core = require("@dogmalang/core");
const Dataset = _core.dogma.use(require("./Dataset"));
const Datum = _core.dogma.use(require("../datum/Datum"));
const ConstDatum = _core.dogma.use(require("../datum/ConstDatum"));
const $LocalDataset = class LocalDataset extends Dataset {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('parent', _['parent'], Dataset);
    Object.defineProperty(this, 'parent', {
      value: (0, _core.coalesce)(_['parent'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_372037649670bf126a231ad631b53641___init__ instanceof Function) this._pvt_372037649670bf126a231ad631b53641___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_372037649670bf126a231ad631b53641___post__ instanceof Function) this._pvt_372037649670bf126a231ad631b53641___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_372037649670bf126a231ad631b53641___validate__ instanceof Function) this._pvt_372037649670bf126a231ad631b53641___validate__(); /* c8 ignore stop */
  }
};

const LocalDataset = new Proxy($LocalDataset, {
  apply(receiver, self, args) {
    return new $LocalDataset(...args);
  }
});
module.exports = exports = LocalDataset;
Object.defineProperty(LocalDataset.prototype, "reprMap", {
  enum: true,
  get: function () {
    const self = this;
    let obj = {};
    {
      obj = this.parent.reprMap;
      for (const [key, datum] of Object.entries(this.data)) {
        {
          _core.dogma.setItem("=", obj, key, datum.getValue());
        }
      }
    }
    return obj;
  }
});
LocalDataset.prototype.setLocalDatum = function (datum) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("datum", datum, Datum);
  {
    _core.dogma.setItem("=", this.data, datum.name, datum);
  }
  return this;
};
LocalDataset.prototype.getDatum = function (name) {
  const self = this;
  let datum; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    if (!(datum = _core.dogma.super(this, "getDatum")(name))) {
      datum = this.parent.getDatum(name);
    }
  }
  return datum;
};