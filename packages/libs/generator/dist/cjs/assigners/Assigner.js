"use strict";

var _core = require("@dogmalang/core");
const {
  Readable
} = _core.dogma.use(require("stream"));
const RunReqStream = _core.dogma.use(require("../RunReqStream"));
const JobInfo = _core.dogma.use(require("./JobInfo"));
const $Assigner = class Assigner {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('input', _['input'], Readable);
    Object.defineProperty(this, 'input', {
      value: (0, _core.coalesce)(_['input'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('output', _['output'], RunReqStream);
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
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Assigner' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Assigner;
Assigner.prototype.start = async function () {
  const self = this;
  {
    const {
      input,
      output
    } = this;
    for await (const blankSheet of input) {
      output.append(this.assign());
    }
    output.end();
  }
};
/* c8 ignore start */
Assigner.prototype.assign = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */