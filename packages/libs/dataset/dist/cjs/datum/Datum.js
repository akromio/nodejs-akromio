"use strict";

var _core = require("@dogmalang/core");
const Constraints = _core.dogma.use(require("../constraints/Constraints"));
const DatumError = _core.dogma.use(require("./DatumError"));
const $Datum = class Datum {
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
    if (_['value'] != null) (0, _core.expect)('value', _['value'], _core.any); /* c8 ignore stop */
    Object.defineProperty(this, 'value', {
      value: (0, _core.coalesce)(_['value'], null),
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['tags'] != null) (0, _core.expect)('tags', _['tags'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'tags', {
      value: (0, _core.coalesce)(_['tags'], []),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'constraints', {
      value: (0, _core.coalesce)(_['constraints'], Constraints()),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_be36ba7fec050041fb68624731eda8a6___init__ instanceof Function) this._pvt_be36ba7fec050041fb68624731eda8a6___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_be36ba7fec050041fb68624731eda8a6___post__ instanceof Function) this._pvt_be36ba7fec050041fb68624731eda8a6___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_be36ba7fec050041fb68624731eda8a6___validate__ instanceof Function) this._pvt_be36ba7fec050041fb68624731eda8a6___validate__(); /* c8 ignore stop */
  }
};

const Datum = new Proxy($Datum, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Datum' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Datum;
Datum.prototype._pvt_be36ba7fec050041fb68624731eda8a6_post = function () {
  const self = this;
  {
    this.setValueWithoutUpdatableCheck(this.value);
  }
};
Datum.prototype._pvt_be36ba7fec050041fb68624731eda8a6___post__ = Datum.prototype._pvt_be36ba7fec050041fb68624731eda8a6_post;
/* c8 ignore start */
Datum.prototype.getValue = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
Datum.prototype.setValueWithoutUpdatableCheck = function (value) {
  const self = this;
  {
    value = this.constraints.validateValue(value);
    _core.dogma.update(this, {
      name: "value",
      visib: ".",
      assign: "=",
      value: value
    });
  }
};
Datum.prototype.setValue = function (value) {
  const self = this;
  {
    if (!this.isUpdatable()) {
      _core.dogma.raise(DatumError(`The datum '${self.name}' is not updatable.`));
    }
    this.setValueWithoutUpdatableCheck(value);
  }
  return this;
};
Datum.prototype.isRemovable = function () {
  const self = this;
  {
    return _core.dogma.includes(this.tags, "removable");
  }
};
Datum.prototype.isUpdatable = function () {
  const self = this;
  {
    return !_core.dogma.includes(this.tags, "const");
  }
};
Datum.prototype.hasTag = function (tag) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("tag", tag);
  {
    return this.tags.includes(tag);
  }
};