"use strict";

var _core = require("@dogmalang/core");
const Constraint = _core.dogma.use(require("./Constraint"));
const ConstraintError = _core.dogma.use(require("./ConstraintError"));
const $DataTypeConstraint = class DataTypeConstraint extends Constraint {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('dataType', _['dataType'], ["any", "bool", "list", "map", "num", "text"]);
    Object.defineProperty(this, 'dataType', {
      value: (0, _core.coalesce)(_['dataType'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_fcbfc4d3387740796581b0216c07e7fb___init__ instanceof Function) this._pvt_fcbfc4d3387740796581b0216c07e7fb___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_fcbfc4d3387740796581b0216c07e7fb___post__ instanceof Function) this._pvt_fcbfc4d3387740796581b0216c07e7fb___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_fcbfc4d3387740796581b0216c07e7fb___validate__ instanceof Function) this._pvt_fcbfc4d3387740796581b0216c07e7fb___validate__(); /* c8 ignore stop */
  }
};

const DataTypeConstraint = new Proxy($DataTypeConstraint, {
  apply(receiver, self, args) {
    return new $DataTypeConstraint(...args);
  }
});
module.exports = exports = DataTypeConstraint;
DataTypeConstraint.prototype.validateValue = function (value) {
  const self = this; /* c8 ignore next */
  if (value != null) _core.dogma.expect("value", value, _core.any);
  {
    let error;
    {
      const _ = this.dataType;
      switch (_) {
        case "any":
          {
            if (value == null) {
              error = "Any value expected";
            }
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "bool":
          {
            if ([true, "t", "true", "y", "yes"].includes(value)) {
              value = true;
            } else if ([false, "f", "false", "n", "no"].includes(value)) {
              value = false;
            } else {
              error = "Boolean expected";
            }
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "list":
          {
            if (_core.dogma.isNot(value, _core.list)) {
              error = "List expected";
            }
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "num":
          {
            {
              const _ = value;
              if (_core.dogma.is(_, _core.num)) {
                {
                  _core.dogma.nop();
                }
              } else if (_core.dogma.is(_, _core.text)) {
                {
                  value = _core.dogma.expect('num(value)', (0, _core.num)(value), _core.num);
                }
              } else {
                {
                  error = "Number expected";
                }
              }
            }
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case "text":
          {
            if (_core.dogma.isNot(value, _core.text)) {
              error = "Text expected";
            }
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
      }
    }
    if (error) {
      _core.dogma.raise(ConstraintError(`${error}. Got: ${(0, _core.typename)(value)}.`));
    }
  }
  return value;
};