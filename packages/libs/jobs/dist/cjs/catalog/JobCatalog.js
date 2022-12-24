"use strict";

var _core = require("@dogmalang/core");
const {
  Plugins
} = _core.dogma.use(require("@akromio/core"));
const Catalog = _core.dogma.use(require("./Catalog"));
const $JobCatalog = class JobCatalog extends Catalog {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('plugins', _['plugins'], Plugins);
    Object.defineProperty(this, 'plugins', {
      value: (0, _core.coalesce)(_['plugins'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['defaultJobName'] != null) (0, _core.expect)('defaultJobName', _['defaultJobName'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'defaultJobName', {
      value: (0, _core.coalesce)(_['defaultJobName'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['jobs'] != null) (0, _core.expect)('jobs', _['jobs'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'jobs', {
      value: (0, _core.coalesce)(_['jobs'], {}),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['defaultTriggerName'] != null) (0, _core.expect)('defaultTriggerName', _['defaultTriggerName'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'defaultTriggerName', {
      value: (0, _core.coalesce)(_['defaultTriggerName'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['triggers'] != null) (0, _core.expect)('triggers', _['triggers'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'triggers', {
      value: (0, _core.coalesce)(_['triggers'], {}),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_14e4ef70508331cc6a23c8e83c5270a1___init__ instanceof Function) this._pvt_14e4ef70508331cc6a23c8e83c5270a1___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_14e4ef70508331cc6a23c8e83c5270a1___post__ instanceof Function) this._pvt_14e4ef70508331cc6a23c8e83c5270a1___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_14e4ef70508331cc6a23c8e83c5270a1___validate__ instanceof Function) this._pvt_14e4ef70508331cc6a23c8e83c5270a1___validate__(); /* c8 ignore stop */
  }
};

const JobCatalog = new Proxy($JobCatalog, {
  apply(receiver, self, args) {
    return new $JobCatalog(...args);
  }
});
module.exports = exports = JobCatalog;
JobCatalog.prototype.finalize = function () {
  const self = this;
  {
    return this.plugins.finalize();
  }
};