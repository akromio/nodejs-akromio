"use strict";

var _core = require("@dogmalang/core");
const Datum = _core.dogma.use(require("../datum/Datum"));
const VarDatum = _core.dogma.use(require("../datum/VarDatum"));
const DatumError = _core.dogma.use(require("../datum/DatumError"));
const $Dataset = class Dataset {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('name', _['name'], _core.text);
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'data', {
      value: {},
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_2cc392fca6dd9822921981eada9969e4___init__ instanceof Function) this._pvt_2cc392fca6dd9822921981eada9969e4___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_2cc392fca6dd9822921981eada9969e4___post__ instanceof Function) this._pvt_2cc392fca6dd9822921981eada9969e4___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_2cc392fca6dd9822921981eada9969e4___validate__ instanceof Function) this._pvt_2cc392fca6dd9822921981eada9969e4___validate__(); /* c8 ignore stop */
  }
};

const Dataset = new Proxy($Dataset, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Dataset' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Dataset;
Object.defineProperty(Dataset.prototype, "repr", {
  enum: true,
  get: function () {
    const self = this;
    {
      return (0, _core.proxy)({}, {
        'get': (target, member, receiver) => {
          /* c8 ignore next */_core.dogma.expect("target", target); /* c8 ignore next */
          _core.dogma.expect("member", member); /* c8 ignore next */
          _core.dogma.expect("receiver", receiver);
          {
            return this.getDatumValue(member);
          }
        }
      });
    }
  }
});
Object.defineProperty(Dataset.prototype, "reprMap", {
  enum: true,
  get: function () {
    const self = this;
    let obj = {};
    {
      for (const [key, datum] of Object.entries(this.data)) {
        {
          _core.dogma.setItem("=", obj, key, datum.getValue());
        }
      }
    }
    return obj;
  }
});
Dataset.prototype.getDatum = function (name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    return _core.dogma.getItem(this.data, name);
  }
};
Dataset.prototype.getData = function (filter) {
  const self = this;
  let data = []; /* c8 ignore next */
  if (filter != null) _core.dogma.expect("filter", filter, _core.dogma.intf("inline", {
    tag: {
      optional: true,
      type: _core.text
    }
  }));
  let {
    tag
  } = filter || {};
  {
    for (const datum of (0, _core.values)(this.data)) {
      if (!tag || tag && datum.hasTag(tag)) {
        data.push(datum);
      }
    }
  }
  return data;
};
Dataset.prototype.setDatum = function (datum) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("datum", datum, Datum);
  {
    const curDatum = this.getDatum(datum.name);
    if (curDatum && !curDatum.isUpdatable()) {
      _core.dogma.raise(DatumError(`Datum ${curDatum.name} is not updatable.`));
    }
    _core.dogma.setItem("=", this.data, datum.name, datum);
  }
  return this;
};
Dataset.prototype.removeDatum = function (name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    {
      const datum = this.getDatum(name);
      if (datum) {
        if (!datum.isRemovable()) {
          _core.dogma.raise(DatumError(`Datum ${name} is not removable.`));
        }
        (0, _core.remove)(name, this.data);
      }
    }
  }
  return this;
};
Dataset.prototype.getDatumValue = function (name) {
  const self = this;
  let value; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    {
      const datum = this.getDatum(name);
      if (datum) {
        value = datum.getValue();
      }
    }
  }
  return value;
};
Dataset.prototype.setDatumValue = function (name, value) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text); /* c8 ignore next */
  if (value != null) _core.dogma.expect("value", value, _core.any);
  {
    {
      const datum = this.getDatum(name);
      if (datum) {
        datum.setValue(value);
      } else {
        _core.dogma.setItem("=", this.data, name, VarDatum({
          'name': name,
          'value': value,
          'tags': []
        }));
      }
    }
  }
  return this;
};
Dataset.prototype.eval = function (exp) {
  const self = this;
  {
    return _core.dogma.use(require("./DatasetEval"))().eval(exp, this);
  }
};