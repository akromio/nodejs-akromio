"use strict";

var _core = require("@dogmalang/core");
const JobCatalog = _core.dogma.use(require("./JobCatalog"));
const $TriggeredJobCatalog = class TriggeredJobCatalog extends JobCatalog {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['triggers'] != null) (0, _core.expect)('triggers', _['triggers'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'triggers', {
      value: (0, _core.coalesce)(_['triggers'], {}),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_b9f1888574f01bbb45d3c4fa8e5e60e7___init__ instanceof Function) this._pvt_b9f1888574f01bbb45d3c4fa8e5e60e7___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b9f1888574f01bbb45d3c4fa8e5e60e7___post__ instanceof Function) this._pvt_b9f1888574f01bbb45d3c4fa8e5e60e7___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_b9f1888574f01bbb45d3c4fa8e5e60e7___validate__ instanceof Function) this._pvt_b9f1888574f01bbb45d3c4fa8e5e60e7___validate__(); /* c8 ignore stop */
  }
};

const TriggeredJobCatalog = new Proxy($TriggeredJobCatalog, {
  apply(receiver, self, args) {
    return new $TriggeredJobCatalog(...args);
  }
});
module.exports = exports = TriggeredJobCatalog;