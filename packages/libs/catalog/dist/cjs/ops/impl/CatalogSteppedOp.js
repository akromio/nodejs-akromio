"use strict";

var _core = require("@dogmalang/core");
const {
  Call,
  Ops
} = _core.dogma.use(require("@akromio/core"));
const StepParser = _core.dogma.use(require("../StepParser"));
const stepParser = StepParser();
const $CatalogSteppedOp = class CatalogSteppedOp {
  /* c8 ignore start */
  constructor() {
    this._constructor(...arguments);
  }

  /* c8 ignore stop */
  _constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('ops', _['ops'], Ops);
    Object.defineProperty(this, 'ops', {
      value: (0, _core.coalesce)(_['ops'], null),
      writable: false,
      enumerable: false
    });
    (0, _core.expect)('steps', _['steps'], _core.dogma.TypeDef({
      name: 'inline',
      types: [_core.any],
      min: 0,
      max: null
    }));
    Object.defineProperty(this, 'steps', {
      value: (0, _core.coalesce)(_['steps'], null),
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_df9152f8d74d1dd170f98278b81974e7___init__ instanceof Function) this._pvt_df9152f8d74d1dd170f98278b81974e7___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_df9152f8d74d1dd170f98278b81974e7___post__ instanceof Function) this._pvt_df9152f8d74d1dd170f98278b81974e7___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_df9152f8d74d1dd170f98278b81974e7___validate__ instanceof Function) this._pvt_df9152f8d74d1dd170f98278b81974e7___validate__(); /* c8 ignore stop */
  }
};

const CatalogSteppedOp = new Proxy($CatalogSteppedOp, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CatalogSteppedOp' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CatalogSteppedOp;
CatalogSteppedOp.prototype.getSteps = function (call) {
  const self = this;
  {
    return this.buildSteps(this.steps, call);
  }
};
CatalogSteppedOp.prototype.buildStep = function (decl, call, defaultResultVarName) {
  const self = this;
  let step; /* c8 ignore next */
  _core.dogma.expect("decl", decl, [_core.text, _core.list, _core.map]); /* c8 ignore next */
  _core.dogma.expect("call", call, Call); /* c8 ignore next */
  _core.dogma.expect("defaultResultVarName", defaultResultVarName, _core.text);
  {
    let opName;
    let args;
    let onError;
    let condition;
    let resultVarName = null;
    let resultLog = false;
    let quiet = false;
    if (decl.log) {
      condition = decl.if;
      decl = decl.log;
      resultLog = true;
    } else if (decl.quiet) {
      condition = decl.if;
      decl = decl.quiet;
      quiet = true;
    } else if (decl.run) {
      condition = decl.if;
      decl = "exec " + decl.run;
    } else if (decl.sudo) {
      condition = decl.if;
      decl = "exec sudo " + decl.sudo;
    }
    if (decl.step) {
      condition = decl.if;
      decl = decl.step;
    }
    ({
      resultVarName: resultVarName,
      opName: opName,
      args: args,
      onError: onError
    } = stepParser.parseStep(decl, this.onError));
    step = {
      ["op"]: this.ops.getOp(opName, {
        'raiseIfNotFound': true
      }),
      ["args"]: args,
      ["onError"]: onError,
      ["quiet"]: quiet,
      ["condition"]: condition,
      ["resultVarName"]: resultVarName || defaultResultVarName,
      ["resultLog"]: resultLog
    };
  }
  return step;
};
CatalogSteppedOp.prototype.buildSteps = function (decls, call) {
  const self = this;
  let steps = [];
  {
    for (const decl of decls) {
      steps.push(this.buildStep(decl, call, "last"));
    }
  }
  return steps;
};