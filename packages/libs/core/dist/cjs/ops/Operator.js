"use strict";

var _core = require("@dogmalang/core");
const {
  Writable
} = _core.dogma.use(require("stream"));
const Call = _core.dogma.use(require("./Call"));
const CallOpts = _core.dogma.use(require("./CallOpts"));
const Op = _core.dogma.use(require("./Op"));
const SimpleOp = _core.dogma.use(require("./simple/SimpleOp"));
const $Operator = class Operator {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_e48b7359d9e4ebe52e60965adaff891d___init__ instanceof Function) this._pvt_e48b7359d9e4ebe52e60965adaff891d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_e48b7359d9e4ebe52e60965adaff891d___post__ instanceof Function) this._pvt_e48b7359d9e4ebe52e60965adaff891d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_e48b7359d9e4ebe52e60965adaff891d___validate__ instanceof Function) this._pvt_e48b7359d9e4ebe52e60965adaff891d___validate__(); /* c8 ignore stop */
  }
};

const Operator = new Proxy($Operator, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Operator' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Operator;
Operator.prototype.run = async function (op, args, opts) {
  const self = this;
  let result; /* c8 ignore next */
  _core.dogma.expect("op", op, Op); /* c8 ignore next */
  _core.dogma.expect("opts", opts, CallOpts);
  {
    result = (0, await this.perform(this.createCall(op, args, opts)));
  }
  return result;
};
/* c8 ignore start */
Operator.prototype.createCall = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
/* c8 ignore start */
Operator.prototype.perform = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */
Operator.prototype.emitOpStart = function (call) {
  const self = this;
  let e; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    e = {
      ["type"]: "opStart",
      ["opType"]: getOpTypeOf(call.op),
      ["id"]: call.id,
      ["title"]: call.title,
      ["ts"]: (0, _core.timestamp)()
    };
    call.log.push(_core.json.encode(e));
  }
  return e;
};
Operator.prototype.emitOpEnd = function (call, result) {
  const self = this;
  let e; /* c8 ignore next */
  _core.dogma.expect("call", call, Call); /* c8 ignore next */
  _core.dogma.expect("result", result);
  {
    e = {
      ["type"]: "opEnd",
      ["opType"]: getOpTypeOf(call.op),
      ["id"]: call.id,
      ["ts"]: (0, _core.timestamp)(),
      ["result"]: Object.assign({}, {
        ["kind"]: result.kind,
        ["duration"]: result.duration
      }, result.kind == "failed" ? {
        ["raised"]: result.value.toString()
      } : {})
    };
    call.log.push(_core.json.encode(e));
  }
  return e;
};
Operator.prototype.emitOpLog = function (call, content) {
  const self = this;
  let e; /* c8 ignore next */
  _core.dogma.expect("call", call, Call);
  {
    {
      const _ = content;
      if (_core.dogma.is(_, _core.text)) {
        {
          _core.dogma.nop();
        }
      } else if (_core.dogma.is(_, Buffer)) {
        {
          content = content.toString();
        }
      } else {
        {
          content = (0, _core.fmt)(content);
        }
      }
    }
    e = {
      ["type"]: "opLog",
      ["opType"]: getOpTypeOf(call.op),
      ["id"]: call.id,
      ["ts"]: (0, _core.timestamp)(),
      ["content"]: content
    };
    call.log.push(_core.json.encode(e));
  }
  return e;
};
function getOpTypeOf(op) {
  /* c8 ignore next */_core.dogma.expect("op", op, Op);
  {
    return _core.dogma.is(op, SimpleOp) ? "simple" : "composite";
  }
}