"use strict";

var _core = require("@dogmalang/core");
const {
  getEntryLink
} = _core.dogma.use(require("@skynetlabs/skynet-nodejs"));
const InternalSkynetConnector = _core.dogma.use(require("../InternalSkynetConnector"));
const $SnsConnector = class SnsConnector extends InternalSkynetConnector {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('publicKey', _['publicKey'], _core.text);
    Object.defineProperty(this, 'publicKey', {
      value: (0, _core.coalesce)(_['publicKey'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('name', _['name'], _core.text);
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_b3bd46e8f3b35df3d6e82ef1c3949d65___init__ instanceof Function) this._pvt_b3bd46e8f3b35df3d6e82ef1c3949d65___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b3bd46e8f3b35df3d6e82ef1c3949d65___post__ instanceof Function) this._pvt_b3bd46e8f3b35df3d6e82ef1c3949d65___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b3bd46e8f3b35df3d6e82ef1c3949d65___validate__ instanceof Function) this._pvt_b3bd46e8f3b35df3d6e82ef1c3949d65___validate__(); /* c8 ignore stop */
  }
};

const SnsConnector = new Proxy($SnsConnector, {
  apply(receiver, self, args) {
    return new $SnsConnector(...args);
  }
});
module.exports = exports = SnsConnector;
Object.defineProperty(SnsConnector.prototype, "skylink", {
  enum: true,
  get: function () {
    const self = this;
    {
      return getEntryLink(this.publicKey, this.name);
    }
  }
});