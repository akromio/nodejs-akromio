"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  CallReqStream
} = _core.dogma.use(require("@akromio/core"));
const PushTrigger = _core.dogma.use(require("./PushTrigger"));
const $TriggerImpl = class TriggerImpl {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_8bd43e69e3780438b9cab15a3e640a99___init__ instanceof Function) this._pvt_8bd43e69e3780438b9cab15a3e640a99___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8bd43e69e3780438b9cab15a3e640a99___post__ instanceof Function) this._pvt_8bd43e69e3780438b9cab15a3e640a99___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8bd43e69e3780438b9cab15a3e640a99___validate__ instanceof Function) this._pvt_8bd43e69e3780438b9cab15a3e640a99___validate__(); /* c8 ignore stop */
  }
};

const TriggerImpl = new Proxy($TriggerImpl, {
  apply(receiver, self, args) {
    return new $TriggerImpl(...args);
  }
});
TriggerImpl.prototype.start = function (handler) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("handler", handler, _core.func);
  {}
};
TriggerImpl.prototype.stop = function () {
  const self = this;
  {}
};
suite(__filename, () => {
  {
    suite("constructor", () => {
      {
        test("when instantiated, new instance must be returned", () => {
          {
            const triggerImpl = TriggerImpl();
            const out = PushTrigger({
              'name': "push",
              'stream': CallReqStream(),
              'triggerImpl': triggerImpl
            });
            expected(out).toBe(PushTrigger);
          }
        });
      }
    });
  }
});