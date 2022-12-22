"use strict";

var _core = require("@dogmalang/core");
const {
  DatasetParser,
  ConstDatum
} = _core.dogma.use(require("@akromio/dataset"));
const shuffle = _core.dogma.use(require("array-shuffle"));
const Operator = _core.dogma.use(require("../Operator"));
const Call = _core.dogma.use(require("../Call"));
const CallOpts = _core.dogma.use(require("../CallOpts"));
const Context = _core.dogma.use(require("../Context"));
const Result = _core.dogma.use(require("../Result"));
const CompositeOp = _core.dogma.use(require("./CompositeOp"));
const Step = _core.dogma.use(require("./Step"));
const ConditionalEval = _core.dogma.use(require("./ConditionalEval"));
const ceval = ConditionalEval().eval;
const $CompositeOperator = class CompositeOperator extends Operator {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_a67f90b8b5dc028f6c7dde18dee5f6be___init__ instanceof Function) this._pvt_a67f90b8b5dc028f6c7dde18dee5f6be___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_a67f90b8b5dc028f6c7dde18dee5f6be___post__ instanceof Function) this._pvt_a67f90b8b5dc028f6c7dde18dee5f6be___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_a67f90b8b5dc028f6c7dde18dee5f6be___validate__ instanceof Function) this._pvt_a67f90b8b5dc028f6c7dde18dee5f6be___validate__(); /* c8 ignore stop */
  }
};

const CompositeOperator = new Proxy($CompositeOperator, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'CompositeOperator' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = CompositeOperator;
CompositeOperator.prototype.createCall = function (op, args, opts) {
  const self = this;
  let call; /* c8 ignore next */
  _core.dogma.expect("op", op, CompositeOp); /* c8 ignore next */
  _core.dogma.expect("opts", opts, CallOpts);
  {
    const params = opts.dataset.eval(args);
    const localDataset = [{
      ["const"]: "params",
      ["value"]: params,
      ["desc"]: "The arguments passed to the operation."
    }].concat(op.dataset);
    const dataset = DatasetParser().parse(localDataset, {
      'name': "local",
      'parent': opts.dataset
    });
    call = Call({
      'onError': opts.onError || op.onError,
      'dataset': dataset,
      'op': op,
      'title': op.buildTitle(),
      'ctx': Context({
        'log': _core.dogma.nop(),
        'params': params
      }),
      'log': opts.log
    });
  }
  return call;
};
CompositeOperator.prototype.perform = async function (call) {
  const self = this;
  let result; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    const start = (0, _core.timestamp)();
    let now;
    let value;
    let kind;
    let duration;
    this.emitOpStart(call);
    value = (0, await this.performWorks(call));
    now = (0, _core.timestamp)();
    if ((0, _core.len)(value) > 0 && _core.dogma.isNot(_core.dogma.getItem(value, 0), Result)) {
      value = _core.dogma.getItem(value, 1);
      kind = "failed";
    } else {
      kind = "ok";
    }
    result = Result({
      'callId': call.id,
      'title': call.title,
      'onError': call.onError,
      'duration': now - start,
      'kind': kind,
      'value': value
    });
    this.emitOpEnd(call, result);
  }
  return result;
};
CompositeOperator.prototype.performWorks = async function (call, opts = {
  ["randomly"]: false
}) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("call", call, Call); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.map);
  {
    _core.dogma.expect('call.op', call.op, CompositeOp);
    let failed = false;
    let results = [];
    0, await this.performInitializerSteps(call, results);
    {
      const [ok] = (0, await this.performSteps(call, results, opts));
      if (ok === false) {
        failed = true;
      }
    }
    0, await this.performFinalizerSteps(call, results);
    if (failed) {
      results = [false, results];
    }
    return results;
  }
};
CompositeOperator.prototype.performStep = function (step, call) {
  const self = this;
  {
    return step.op.runWith(step.args, {
      'parentCall': call,
      'title': step.title,
      'dataset': call.dataset,
      'log': call.log,
      'resultLog': step.resultLog,
      'onError': step.onError,
      'quiet': step.quiet
    });
  }
};
CompositeOperator.prototype.performInitializerSteps = function (call, results) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("call", call, Call); /* c8 ignore next */
  _core.dogma.expect("results", results, _core.list);
  {
    return this._performSteps(call.op.getInitializerSteps(call), call, results, {
      'randomly': false
    });
  }
};
CompositeOperator.prototype.performFinalizerSteps = function (call, results) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("call", call, Call); /* c8 ignore next */
  _core.dogma.expect("results", results, _core.list);
  {
    return this._performSteps(call.op.getFinalizerSteps(call), call, results, {
      'randomly': false
    });
  }
};
CompositeOperator.prototype.performSteps = async function (call, results, opts = {
  ["randomly"]: false
}) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("call", call, Call); /* c8 ignore next */
  _core.dogma.expect("results", results, _core.list); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.map);
  {
    return this._performSteps((0, await call.op.getSteps(call)), call, results, opts);
  }
};
CompositeOperator.prototype._performSteps = async function (steps, call, results, opts) {
  const self = this;
  let {
    randomly
  } = opts;
  {
    if (randomly) {
      steps = shuffle(steps);
    }
    const {
      dataset
    } = call;
    for (const step of steps) {
      var _step$resultVarName;
      /*c8 ignore next*/_core.dogma.expect('step', step, Step);
      {
        let cond = step.condition;
        if (cond) {
          if (!_core.dogma.includes([true, "true", "y", "yes", "Y"], ceval(cond, dataset.reprMap))) {
            continue;
          }
        }
      }
      const result = (0, await this.performStep(step, call));
      if (!step.quiet) {
        results.push(result);
      }
      if (result.kind == "failed" && step.onError == "finish") {
        return [false, results];
      }
      dataset.setDatumValue((_step$resultVarName = step.resultVarName) !== null && _step$resultVarName !== void 0 ? _step$resultVarName : "last", result.value);
    }
  }
  return results;
};