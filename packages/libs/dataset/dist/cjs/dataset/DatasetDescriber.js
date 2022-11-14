"use strict";

var _core = require("@dogmalang/core");
const Dataset = _core.dogma.use(require("./Dataset"));
const VarDatum = _core.dogma.use(require("../datum/VarDatum"));
const ConstDatum = _core.dogma.use(require("../datum/ConstDatum"));
const DatumFn = _core.dogma.use(require("../datum/DatumFn"));
const EnumConstraint = _core.dogma.use(require("../constraints/EnumConstraint"));
const $DatasetDescriber = class DatasetDescriber {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_99cf45b455a23c1bea06309fddfcd6b0___init__ instanceof Function) this._pvt_99cf45b455a23c1bea06309fddfcd6b0___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_99cf45b455a23c1bea06309fddfcd6b0___post__ instanceof Function) this._pvt_99cf45b455a23c1bea06309fddfcd6b0___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_99cf45b455a23c1bea06309fddfcd6b0___validate__ instanceof Function) this._pvt_99cf45b455a23c1bea06309fddfcd6b0___validate__(); /* c8 ignore stop */
  }
};

const DatasetDescriber = new Proxy($DatasetDescriber, {
  apply(receiver, self, args) {
    return new $DatasetDescriber(...args);
  }
});
module.exports = exports = DatasetDescriber;
DatasetDescriber.prototype.describeData = function (dataset, opts) {
  const self = this;
  let data = {}; /* c8 ignore next */
  _core.dogma.expect("dataset", dataset, Dataset); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, ListDataOpts);
  {
    const datasets = [];
    if (dataset.parent) {
      datasets.push(dataset.parent);
    }
    datasets.push(dataset);
    for (const ds of datasets) {
      for (const [key, datum] of Object.entries(ds.data)) {
        {
          {
            const tag = opts != null ? opts.tag : null;
            if (!tag || datum.hasTag(tag)) {
              if (!datum.hasTag("hidden")) {
                var _datum$desc;
                const {
                  name
                } = datum;
                let kind;
                let value;
                let options;
                {
                  const _ = datum; /*c8 ignore else*/
                  if (_core.dogma.is(_, VarDatum)) {
                    {
                      kind = "var";
                      value = datum.getValue();
                    }
                  } else if (_core.dogma.is(_, ConstDatum)) {
                    {
                      kind = "const";
                      value = datum.getValue();
                    }
                  } else if (_core.dogma.is(_, DatumFn)) {
                    {
                      kind = "fn";
                      value = datum.getValue();
                    }
                  }
                }
                if (value != null && !(opts != null ? opts.showPasswordValues : null) && datum.hasTag("password")) {
                  value = "*****";
                }
                {
                  const constraint = datum.constraints.findConstraintByType(EnumConstraint);
                  if (constraint) {
                    ({
                      options: options
                    } = constraint);
                  }
                }
                _core.dogma.setItem("=", data, name, Object.assign({}, {
                  ["kind"]: kind,
                  ["value"]: value,
                  ["desc"]: (_datum$desc = datum.desc) !== null && _datum$desc !== void 0 ? _datum$desc : ""
                }, options ? {
                  ["options"]: options
                } : {}));
              }
            }
          }
        }
      }
    }
  }
  return data;
};
const ListDataOpts = _core.dogma.intf('ListDataOpts', {
  showPasswordValues: {
    optional: true,
    type: _core.bool
  },
  tag: {
    optional: true,
    type: _core.text
  }
});