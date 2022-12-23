"use strict";

var _core = require("@dogmalang/core");
const JobInfo = _core.dogma.use(require("./JobInfo"));
const $Assigner = class Assigner {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('input', _['input'], null);
    Object.defineProperty(this, 'input', {
      value: (0, _core.coalesce)(_['input'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('output', _['output'], null);
    Object.defineProperty(this, 'output', {
      value: (0, _core.coalesce)(_['output'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('jobs', _['jobs'], _core.dogma.TypeDef({
      name: 'inline',
      types: [JobInfo],
      min: 0,
      max: null
    }));
    Object.defineProperty(this, 'jobs', {
      value: (0, _core.coalesce)(_['jobs'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_ab27666e79a50c9410a9e2a9d2bac25d___init__ instanceof Function) this._pvt_ab27666e79a50c9410a9e2a9d2bac25d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ab27666e79a50c9410a9e2a9d2bac25d___post__ instanceof Function) this._pvt_ab27666e79a50c9410a9e2a9d2bac25d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ab27666e79a50c9410a9e2a9d2bac25d___validate__ instanceof Function) this._pvt_ab27666e79a50c9410a9e2a9d2bac25d___validate__(); /* c8 ignore stop */
  }
};

const Assigner = new Proxy($Assigner, {
  apply(receiver, self, args) {
    return new $Assigner(...args);
  }
});
module.exports = exports = Assigner;
Assigner.prototype._pvt_ab27666e79a50c9410a9e2a9d2bac25d_post = function () {
  const self = this;
  {
    let total = 0;
    for (const job of this.jobs) {
      total += job.weight;
    }
    if (total != 100) {
      _core.dogma.raise(TypeError(`Sum of job weights must be 100. Got: ${total}.`));
    }
  }
};
Assigner.prototype._pvt_ab27666e79a50c9410a9e2a9d2bac25d___post__ = Assigner.prototype._pvt_ab27666e79a50c9410a9e2a9d2bac25d_post;
Assigner.prototype.start = async function () {
  const self = this;
  {
    for await (const blankSheet of this.input) {
      _core.dogma.nop();
    }
  }
};