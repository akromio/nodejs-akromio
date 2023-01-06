"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const Trigger = _core.dogma.use(require("./Trigger"));
const TriggerState = _core.dogma.use(require("./TriggerState"));
const $Engine = class Engine {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_13e200b5f20602815c1003cc0390c086___init__ instanceof Function) this._pvt_13e200b5f20602815c1003cc0390c086___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_13e200b5f20602815c1003cc0390c086___post__ instanceof Function) this._pvt_13e200b5f20602815c1003cc0390c086___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_13e200b5f20602815c1003cc0390c086___validate__ instanceof Function) this._pvt_13e200b5f20602815c1003cc0390c086___validate__(); /* c8 ignore stop */
  }
};

const Engine = new Proxy($Engine, {
  apply(receiver, self, args) {
    return new $Engine(...args);
  }
});
Engine.prototype.run = function () {
  const self = this;
  {}
};
const $TriggerImpl = class TriggerImpl {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['handler'] != null) (0, _core.expect)('handler', _['handler'], _core.func); /* c8 ignore stop */
    Object.defineProperty(this, 'handler', {
      value: (0, _core.coalesce)(_['handler'], null),
      writable: true,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_13e200b5f20602815c1003cc0390c086___init__ instanceof Function) this._pvt_13e200b5f20602815c1003cc0390c086___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_13e200b5f20602815c1003cc0390c086___post__ instanceof Function) this._pvt_13e200b5f20602815c1003cc0390c086___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_13e200b5f20602815c1003cc0390c086___validate__ instanceof Function) this._pvt_13e200b5f20602815c1003cc0390c086___validate__(); /* c8 ignore stop */
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
  {
    _core.dogma.update(this, {
      name: "handler",
      visib: ".",
      assign: "=",
      value: handler
    });
  }
};
TriggerImpl.prototype.stop = function () {
  const self = this;
  {}
};
TriggerImpl.prototype.fireEvent = async function (e) {
  const self = this;
  {
    0, await this.handler(e);
  }
};
suite(__filename, () => {
  {
    const name = "test";
    const engine = Engine();
    const call = {
      ["jobName"]: "hello",
      ["args"]: [1, 2, 3]
    };
    suite("start()", () => {
      {
        test("when non started, impl.start() must be called", async () => {
          {
            const triggerImpl = monitor(TriggerImpl(), {
              'members': ["start"],
              'onlyCalls': true
            });
            const trigger = Trigger({
              'name': name,
              'engine': engine,
              'call': call,
              'triggerImpl': triggerImpl
            });
            0, await trigger.start();
            const log = monitor.log(triggerImpl);
            expected(trigger).toHave({
              'state': TriggerState.started
            });
            expected(log.calls).equalTo(1);
            expected(log.getCall(0).args).toHaveLen(1).it(0).toBeFn();
          }
        });
        test("when started, error must be raised", async () => {
          {
            const triggerImpl = TriggerImpl();
            const trigger = (0, await Trigger({
              'name': name,
              'engine': engine,
              'call': call,
              'triggerImpl': triggerImpl
            }).start());
            const out = await _core.dogma.pawait(() => trigger.start());
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("The trigger has been already started."));
          }
        });
      }
    });
    suite("stop()", () => {
      {
        test("when non started, nothing to do", async () => {
          {
            const triggerImpl = monitor(TriggerImpl(), {
              'members': ["stop"],
              'onlyCalls': true
            });
            const trigger = Trigger({
              'name': name,
              'engine': engine,
              'call': call,
              'triggerImpl': triggerImpl
            });
            0, await trigger.stop();
            const log = monitor.log(triggerImpl);
            expected(trigger).toHave({
              'state': TriggerState.nonStarted
            });
            expected(log.calls).equalTo(0);
          }
        });
        test("when started, impl.stop() must be called", async () => {
          {
            const triggerImpl = monitor(TriggerImpl(), {
              'members': ["stop"],
              'onlyCalls': true
            });
            const trigger = (0, await Trigger({
              'name': name,
              'engine': engine,
              'call': call,
              'triggerImpl': triggerImpl
            }).start());
            0, await trigger.stop();
            const log = monitor.log(triggerImpl);
            expected(log.calls).equalTo(1);
          }
        });
        test("when callback set, this must be called", async () => {
          {
            const triggerImpl = TriggerImpl();
            const callback = monitor(_core.dogma.nop());
            const trigger = (0, await Trigger({
              'name': name,
              'engine': engine,
              'call': call,
              'triggerImpl': triggerImpl
            }).start(callback));
            0, await trigger.stop();
            const log = monitor.log(callback);
            expected(log.calls).equalTo(1);
          }
        });
      }
    });
    suite("handle()", () => {
      {
        test("when started and called, engine must be called", async () => {
          {
            const engine = monitor(Engine(), {
              'members': ["run"],
              'onlyCalls': true
            });
            const triggerImpl = monitor(TriggerImpl(), {
              'members': ["stop"],
              'onlyCalls': true
            });
            const trigger = (0, await Trigger({
              'name': name,
              'engine': engine,
              'triggerImpl': triggerImpl
            }).start());
            const e = {
              ["ts"]: (0, _core.timestamp)(),
              ["call"]: call,
              ["last"]: false
            };
            0, await triggerImpl.fireEvent(e);
            expected(trigger.state).equalTo(TriggerState.started);
            const run = monitor.log(engine);
            expected(run.calls).equalTo(1);
            expected(run.calledWith([call.jobName, call.args])).equalTo(1);
            const stop = monitor.log(triggerImpl);
            expected(stop.calls).equalTo(0);
          }
        });
        test("when started and called with last event, engine must be called and impl.stop() too", async () => {
          {
            const engine = monitor(Engine(), {
              'members': ["run"],
              'onlyCalls': true
            });
            const triggerImpl = monitor(TriggerImpl(), {
              'members': ["stop"],
              'onlyCalls': true
            });
            const trigger = (0, await Trigger({
              'name': name,
              'engine': engine,
              'triggerImpl': triggerImpl
            }).start());
            const e = {
              ["ts"]: (0, _core.timestamp)(),
              ["call"]: call,
              ["last"]: true
            };
            0, await triggerImpl.fireEvent(e);
            expected(trigger.state).equalTo(TriggerState.stopped);
            const run = monitor.log(engine);
            expected(run.calls).equalTo(1);
            expected(run.calledWith([call.jobName, call.args])).equalTo(1);
            const stop = monitor.log(triggerImpl);
            expected(stop.calls).equalTo(1);
          }
        });
        test("when job is __exit__, last event must be generated", async () => {
          {
            const engine = monitor(Engine(), {
              'members': ["run"],
              'onlyCalls': true
            });
            const triggerImpl = monitor(TriggerImpl(), {
              'members': ["stop"],
              'onlyCalls': true
            });
            const trigger = (0, await Trigger({
              'name': name,
              'engine': engine,
              'triggerImpl': triggerImpl
            }).start());
            const call = {
              ["jobName"]: "__exit__"
            };
            const e = {
              ["ts"]: (0, _core.timestamp)(),
              ["call"]: call,
              ["last"]: false
            };
            0, await triggerImpl.fireEvent(e);
            expected(trigger.state).equalTo(TriggerState.stopped);
            const run = monitor.log(engine);
            expected(run.calls).equalTo(0);
            const stop = monitor.log(triggerImpl);
            expected(stop.calls).equalTo(1);
          }
        });
        test("when running and called, error must be raised", async () => {
          {
            const triggerImpl = TriggerImpl();
            const trigger = (0, await Trigger({
              'name': name,
              'engine': engine,
              'triggerImpl': triggerImpl
            }).start());
            const e = {
              ["ts"]: (0, _core.timestamp)(),
              ["call"]: call
            };
            triggerImpl.fireEvent(e);
            const out = await _core.dogma.pawait(() => triggerImpl.fireEvent(e));
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("Trigger still processing an event."));
          }
        });
      }
    });
  }
});