"use strict";

var _core = require("@dogmalang/core");
const SimpleOp = _core.dogma.use(require("./SimpleOp"));
const Operator = _core.dogma.use(require("../Operator"));
const CallOpts = _core.dogma.use(require("../CallOpts"));
const Call = _core.dogma.use(require("../Call"));
const Context = _core.dogma.use(require("../Context"));
const Result = _core.dogma.use(require("../Result"));
const $SimpleOperator = class SimpleOperator extends Operator {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_f442015fcdcd292c1a9cd5d67955cff8___init__ instanceof Function) this._pvt_f442015fcdcd292c1a9cd5d67955cff8___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f442015fcdcd292c1a9cd5d67955cff8___post__ instanceof Function) this._pvt_f442015fcdcd292c1a9cd5d67955cff8___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_f442015fcdcd292c1a9cd5d67955cff8___validate__ instanceof Function) this._pvt_f442015fcdcd292c1a9cd5d67955cff8___validate__(); /* c8 ignore stop */
  }
};

const SimpleOperator = new Proxy($SimpleOperator, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'SimpleOperator' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = SimpleOperator;
SimpleOperator.prototype.createCall = function (op, args, opts) {
  const self = this;
  let call; /* c8 ignore next */
  _core.dogma.expect("op", op, SimpleOp); /* c8 ignore next */
  _core.dogma.expect("opts", opts, CallOpts);
  {
    const params = op.buildParams(args, opts.dataset);
    const title = op.buildTitle(params);
    call = Call({
      'onError': opts.onError || "carryOn",
      'dataset': opts.dataset,
      'op': op,
      'title': title,
      'ctx': Context({
        'params': params,
        'state': op.state,
        'log': (...msg) => {
          {
            this.emitOpLog(call, msg.join(" "));
          }
        }
      }),
      'log': opts.log,
      'resultLog': opts.resultLog,
      'quiet': opts.quiet
    });
  }
  return call;
};
SimpleOperator.prototype.perform = async function (call) {
  const self = this;
  let result; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    const start = (0, _core.timestamp)();
    const {
      quiet,
      resultLog
    } = call;
    let now;
    let value;
    let kind;
    let duration;
    try {
      if (!quiet) {
        this.emitOpStart(call);
      }
      value = (0, await this.performWork(call));
      now = (0, _core.timestamp)();
      kind = "ok";
    } catch (e) {
      now = (0, _core.timestamp)();
      value = e;
      kind = "failed";
    }
    result = Result({
      'callId': call.id,
      'title': call.title,
      'onError': call.onError,
      'duration': now - start,
      'kind': kind,
      'value': value
    });
    if (resultLog) {
      this.emitOpLog(call, result.value);
    }
    if (!quiet) {
      this.emitOpEnd(call, result);
    }
  }
  return result;
};
/* c8 ignore start */
SimpleOperator.prototype.performWork = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */