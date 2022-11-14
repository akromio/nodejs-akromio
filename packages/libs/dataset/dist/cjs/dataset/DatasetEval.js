"use strict";

var _core = require("@dogmalang/core");
const get = _core.dogma.use(require("lodash.get"));
const Dataset = _core.dogma.use(require("./Dataset"));
const $DatasetEval = class DatasetEval {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_05b1b350d8f970244f92ae2a12569e0f___init__ instanceof Function) this._pvt_05b1b350d8f970244f92ae2a12569e0f___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_05b1b350d8f970244f92ae2a12569e0f___post__ instanceof Function) this._pvt_05b1b350d8f970244f92ae2a12569e0f___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_05b1b350d8f970244f92ae2a12569e0f___validate__ instanceof Function) this._pvt_05b1b350d8f970244f92ae2a12569e0f___validate__(); /* c8 ignore stop */
  }
};

const DatasetEval = new Proxy($DatasetEval, {
  apply(receiver, self, args) {
    return new $DatasetEval(...args);
  }
});
module.exports = exports = DatasetEval;
DatasetEval.prototype.eval = function (exp, ds) {
  const self = this;
  let value; /* c8 ignore next */
  if (exp != null) _core.dogma.expect("exp", exp, _core.any); /* c8 ignore next */
  _core.dogma.expect("ds", ds, Dataset);
  {
    {
      const _ = exp;
      if (_core.dogma.is(_, _core.bool) || _core.dogma.is(_, _core.num) || _core.dogma.is(_, null) || _core.dogma.is(_, _core.func)) {
        {
          value = exp;
        }
      } else if (_core.dogma.is(_, _core.text)) {
        {
          value = this.evalExp(exp, ds);
        }
      } else if (_core.dogma.is(_, _core.list)) {
        {
          value = this.evalList(exp, ds);
        }
      } else if (_core.dogma.is(_, _core.map)) {
        {
          value = this.evalMap(exp, ds);
        }
      }
    }
  }
  return value;
};
DatasetEval.prototype.evalExp = function (exp, ds) {
  const self = this;
  let value;
  {
    const onlyVarPattern = (0, _core.re)("^\\$\\(([^(]+)\\)$");
    const multiVarsPattern = (0, _core.re)("\\$\\(([^(]+)\\)");
    if (exp == "$(*)") {
      value = ds.reprMap;
    } else if (onlyVarPattern.test(exp)) {
      value = this.parseRef(_core.dogma.getItem(onlyVarPattern.exec(exp), 1), ds);
    } else if (multiVarsPattern.test(exp)) {
      value = exp;
      for (let match; match = multiVarsPattern.exec(value);) {
        const [, ref] = _core.dogma.getArrayToUnpack(match, 2);
        value = value.replace("$(" + ref + ")", this.parseRef(ref, ds));
      }
    } else {
      value = exp;
    }
  }
  return value;
};
DatasetEval.prototype.parseRef = function (ref, ds) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("ref", ref, _core.text); /* c8 ignore next */
  _core.dogma.expect("ds", ds, Dataset);
  {
    return get(ds.repr, ref);
  }
};
DatasetEval.prototype.evalList = function (array, ds) {
  const self = this;
  let value = []; /* c8 ignore next */
  _core.dogma.expect("array", array, _core.list); /* c8 ignore next */
  _core.dogma.expect("ds", ds, Dataset);
  {
    for (const i of array) {
      value.push(this.eval(i, ds));
    }
  }
  return value;
};
DatasetEval.prototype.evalMap = function (object, ds) {
  const self = this;
  let value = {}; /* c8 ignore next */
  _core.dogma.expect("object", object, _core.map); /* c8 ignore next */
  _core.dogma.expect("ds", ds, Dataset);
  {
    for (const [k, v] of Object.entries(object)) {
      {
        _core.dogma.setItem("=", value, k, this.eval(v, ds));
      }
    }
  }
  return value;
};