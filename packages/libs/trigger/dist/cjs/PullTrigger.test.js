"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  interceptor,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const {
  CallReqStream
} = _core.dogma.use(require("@akromio/core"));
const PullTrigger = _core.dogma.use(require("./PullTrigger"));
const $TriggerImpl = class TriggerImpl {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_486ba240140e02f3c5063ff7b4847f3c___init__ instanceof Function) this._pvt_486ba240140e02f3c5063ff7b4847f3c___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_486ba240140e02f3c5063ff7b4847f3c___post__ instanceof Function) this._pvt_486ba240140e02f3c5063ff7b4847f3c___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_486ba240140e02f3c5063ff7b4847f3c___validate__ instanceof Function) this._pvt_486ba240140e02f3c5063ff7b4847f3c___validate__(); /* c8 ignore stop */
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
TriggerImpl.prototype.gather = function () {
  const self = this;
  {
    return 0;
  }
};
suite(__filename, () => {
  {
    suite("constructor", () => {
      {
        test("when instantiated, new instance must be returned", () => {
          {
            const triggerImpl = TriggerImpl();
            const out = PullTrigger({
              'name': "pull",
              'stream': CallReqStream(),
              'triggerImpl': triggerImpl
            });
            expected(out).toBe(PullTrigger);
          }
        });
      }
    });
    suite("gather()", () => {
      {
        test("when available data, no reattempt must be performed", async () => {
          {
            const triggerImpl = interceptor(TriggerImpl(), {
              'gather': method.returns(5)
            });
            const trigger = monitor(PullTrigger({
              'name': "pull",
              'stream': CallReqStream(),
              'triggerImpl': triggerImpl,
              'retryTimeout': 250
            }), {
              'method': "gather"
            });
            const out = trigger.gather(5);
            0, await (0, _core.sleep)("500ms");
            const gather = monitor.log(trigger, {
              'clear': true
            });
            expected(gather.calls).equalTo(1);
          }
        });
        test("when unavailable data, a reattempt must be performed", async () => {
          {
            const triggerImpl = interceptor(TriggerImpl(), {
              'gather': method([{
                ["i"]: 0,
                ["returns"]: 0
              }, {
                ["returns"]: 1
              }])
            });
            const trigger = monitor(PullTrigger({
              'name': "pull",
              'stream': CallReqStream(),
              'triggerImpl': triggerImpl,
              'retryTimeout': 250
            }), {
              'method': "gather"
            });
            const out = trigger.gather(5);
            0, await (0, _core.sleep)("600ms");
            const gather = monitor.log(trigger, {
              'clear': true
            });
            expected(gather.calls).equalTo(2);
          }
        });
      }
    });
  }
});