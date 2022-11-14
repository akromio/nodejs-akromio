"use strict";

var _core = require("@dogmalang/core");
const $Repository = class Repository {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('name', _['name'], _core.text);
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_da4e980daa41dec660b4c5801be515f8___init__ instanceof Function) this._pvt_da4e980daa41dec660b4c5801be515f8___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_da4e980daa41dec660b4c5801be515f8___post__ instanceof Function) this._pvt_da4e980daa41dec660b4c5801be515f8___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_da4e980daa41dec660b4c5801be515f8___validate__ instanceof Function) this._pvt_da4e980daa41dec660b4c5801be515f8___validate__(); /* c8 ignore stop */
  }
};

const Repository = new Proxy($Repository, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Repository' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Repository;
Repository.prototype.get = function (name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    return this.getDatum(name);
  }
};
/* c8 ignore start */
Repository.prototype.getDatum = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */