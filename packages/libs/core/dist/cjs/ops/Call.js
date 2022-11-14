"use strict";

var _core = require("@dogmalang/core");
const {
  Writable
} = _core.dogma.use(require("stream"));
const {
  v4: uuid
} = _core.dogma.use(require("uuid"));
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const Op = _core.dogma.use(require("./Op"));
const Context = _core.dogma.use(require("./Context"));
const $Call = class Call {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['id'] != null) (0, _core.expect)('id', _['id'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'id', {
      value: (0, _core.coalesce)(_['id'], uuid()),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['parentCall'] != null) (0, _core.expect)('parentCall', _['parentCall'], Call); /* c8 ignore stop */
    Object.defineProperty(this, 'parentCall', {
      value: (0, _core.coalesce)(_['parentCall'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('op', _['op'], null);
    Object.defineProperty(this, 'op', {
      value: (0, _core.coalesce)(_['op'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('title', _['title'], _core.text);
    Object.defineProperty(this, 'title', {
      value: (0, _core.coalesce)(_['title'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('onError', _['onError'], ["carryOn", "finish"]);
    Object.defineProperty(this, 'onError', {
      value: (0, _core.coalesce)(_['onError'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('dataset', _['dataset'], Dataset);
    Object.defineProperty(this, 'dataset', {
      value: (0, _core.coalesce)(_['dataset'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('log', _['log'], Writable);
    Object.defineProperty(this, 'log', {
      value: (0, _core.coalesce)(_['log'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['resultLog'] != null) (0, _core.expect)('resultLog', _['resultLog'], _core.bool); /* c8 ignore stop */
    Object.defineProperty(this, 'resultLog', {
      value: (0, _core.coalesce)(_['resultLog'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['quiet'] != null) (0, _core.expect)('quiet', _['quiet'], _core.bool); /* c8 ignore stop */
    Object.defineProperty(this, 'quiet', {
      value: (0, _core.coalesce)(_['quiet'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('ctx', _['ctx'], Context);
    Object.defineProperty(this, 'ctx', {
      value: (0, _core.coalesce)(_['ctx'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_e6330ad657df8fa9947a4937b5e87110___init__ instanceof Function) this._pvt_e6330ad657df8fa9947a4937b5e87110___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_e6330ad657df8fa9947a4937b5e87110___post__ instanceof Function) this._pvt_e6330ad657df8fa9947a4937b5e87110___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_e6330ad657df8fa9947a4937b5e87110___validate__ instanceof Function) this._pvt_e6330ad657df8fa9947a4937b5e87110___validate__(); /* c8 ignore stop */
  }
};

const Call = new Proxy($Call, {
  apply(receiver, self, args) {
    return new $Call(...args);
  }
});
module.exports = exports = Call;