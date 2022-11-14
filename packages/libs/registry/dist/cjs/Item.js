"use strict";

var _core = require("@dogmalang/core");
const $Item = class Item {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('registryName', _['registryName'], _core.text);
    Object.defineProperty(this, 'registryName', {
      value: (0, _core.coalesce)(_['registryName'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('name', _['name'], _core.text);
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('cty', _['cty'], _core.text);
    Object.defineProperty(this, 'cty', {
      value: (0, _core.coalesce)(_['cty'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('value', _['value'], _core.any);
    Object.defineProperty(this, 'value', {
      value: (0, _core.coalesce)(_['value'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_6115f206913f9d70c7c0f7b52aa575b1___init__ instanceof Function) this._pvt_6115f206913f9d70c7c0f7b52aa575b1___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6115f206913f9d70c7c0f7b52aa575b1___post__ instanceof Function) this._pvt_6115f206913f9d70c7c0f7b52aa575b1___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6115f206913f9d70c7c0f7b52aa575b1___validate__ instanceof Function) this._pvt_6115f206913f9d70c7c0f7b52aa575b1___validate__(); /* c8 ignore stop */
  }
};

const Item = new Proxy($Item, {
  apply(receiver, self, args) {
    return new $Item(...args);
  }
});
module.exports = exports = Item;
Object.defineProperty(Item.prototype, "uri", {
  enum: true,
  get: function () {
    const self = this;
    {
      return `${self.registryName}://${self.name}`;
    }
  }
});