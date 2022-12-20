"use strict";

var _core = require("@dogmalang/core");
const VarDatum = _core.dogma.use(require("../datum/VarDatum"));
const ConstDatum = _core.dogma.use(require("../datum/ConstDatum"));
const DatumFn = _core.dogma.use(require("../datum/DatumFn"));
const Constraints = _core.dogma.use(require("../constraints/Constraints"));
const RequiredConstraint = _core.dogma.use(require("../constraints/RequiredConstraint"));
const DataTypeConstraint = _core.dogma.use(require("../constraints/DataTypeConstraint"));
const EnumConstraint = _core.dogma.use(require("../constraints/EnumConstraint"));
const Dataset = _core.dogma.use(require("../dataset/Dataset"));
const LocalDataset = _core.dogma.use(require("../dataset/LocalDataset"));
const DatasetParseOpts = _core.dogma.intf('DatasetParseOpts', {
  name: {
    optional: false,
    type: _core.text
  },
  parent: {
    optional: false,
    type: Dataset
  }
});
const $DatasetParser = class DatasetParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_8c658df682f51537f80095d9da71c3c0___init__ instanceof Function) this._pvt_8c658df682f51537f80095d9da71c3c0___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8c658df682f51537f80095d9da71c3c0___post__ instanceof Function) this._pvt_8c658df682f51537f80095d9da71c3c0___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8c658df682f51537f80095d9da71c3c0___validate__ instanceof Function) this._pvt_8c658df682f51537f80095d9da71c3c0___validate__(); /* c8 ignore stop */
  }
};

const DatasetParser = new Proxy($DatasetParser, {
  apply(receiver, self, args) {
    return new $DatasetParser(...args);
  }
});
module.exports = exports = DatasetParser;
DatasetParser.prototype.parse = function (decl, opts) {
  const self = this;
  let ds;
  {
    ds = LocalDataset({
      'name': opts.name,
      'parent': opts.parent
    });
    for (const datum of decl) {
      ds.setLocalDatum(this.parseDatumDecl(datum, ds));
    }
  }
  return ds;
};
DatasetParser.prototype.parseDatumDecl = function (decl, ds) {
  const self = this;
  let datum; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("ds", ds, Dataset);
  {
    let Datum;
    let name;
    if (_core.dogma.includes(decl, "var")) {
      Datum = VarDatum;
      name = decl.var;
    } else if (_core.dogma.includes(decl, "const")) {
      Datum = ConstDatum;
      name = decl.const;
    } else if (_core.dogma.includes(decl, "fn")) {
      Datum = DatumFn;
      name = decl.fn;
    } else if (_core.dogma.includes(decl, "input")) {
      var _decl$tags;
      Datum = ConstDatum;
      name = decl.input;
      decl.value = "$(args." + name + ")";
      decl.required = true;
      decl.tags = ((_decl$tags = decl.tags) !== null && _decl$tags !== void 0 ? _decl$tags : []).concat("input");
    } else {
      _core.dogma.raise(TypeError(`Datum declaration must be 'const', 'fn', 'input' or 'var'. Got: ${(0, _core.fmt)(decl)}.`));
    }
    const constraints = Constraints();
    if (decl.required == true) {
      constraints.appendConstraint(RequiredConstraint());
    }
    if (_core.dogma.is(decl.options, _core.list)) {
      constraints.appendConstraint(EnumConstraint({
        'options': decl.options
      }));
    }
    if (decl.dataType) {
      constraints.appendConstraint(DataTypeConstraint({
        'dataType': decl.dataType
      }));
    }
    let value = ds.eval(decl.value);
    if (value == null && _core.dogma.includes(decl, "defaultValue")) {
      value = decl.defaultValue;
    }
    {
      const [ok, err] = _core.dogma.peval(() => {
        return constraints.validateValue(value);
      });
      if (!ok) {
        _core.dogma.raise(TypeError(`Error on datum '${name}': ${err.message}`));
      }
    }
    datum = Datum(_core.dogma.clone(decl, {
      "name": name,
      "value": value,
      "constraints": constraints
    }, {}, [], []));
  }
  return datum;
};