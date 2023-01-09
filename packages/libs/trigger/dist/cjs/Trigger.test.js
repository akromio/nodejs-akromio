"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  interceptor
} = _core.dogma.use(require("@akromio/doubles"));
const Trigger = _core.dogma.use(require("./Trigger"));
const TriggerState = _core.dogma.use(require("./TriggerState"));
const JobCallStream = _core.dogma.use(require("./JobCallStream"));
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
    const call = {
      ["jobName"]: "hello",
      ["args"]: [1, 2, 3]
    };
    suite("start()", () => {
      {
        test("when non started, impl.start() must be called", async () => {
          {
            const triggerImpl = monitor(TriggerImpl(), {
              'method': "start"
            });
            const stream = JobCallStream();
            const trigger = Trigger({
              'name': name,
              'stream': stream,
              'triggerImpl': triggerImpl
            });
            0, await trigger.start();
            expected(trigger).toHave({
              'state': TriggerState.started
            });
            const start = monitor.log(triggerImpl, {
              'clear': true
            });
            expected(start.calls).equalTo(1);
            expected(start.call.args).toHaveLen(1).first.toBeFn();
          }
        });
        test("when started, error must be raised", async () => {
          {
            const triggerImpl = TriggerImpl();
            const stream = JobCallStream();
            const trigger = (0, await Trigger({
              'name': name,
              'stream': stream,
              'triggerImpl': triggerImpl
            }).start());
            const out = await _core.dogma.pawait(() => trigger.start());
            expected(out).first.equalTo(false).second.equalTo(TypeError("The trigger has been already started."));
          }
        });
      }
    });
    suite("stop()", () => {
      {
        test("when non started, nothing to do", async () => {
          {
            const triggerImpl = monitor(TriggerImpl(), {
              'method': "stop"
            });
            const stream = JobCallStream();
            const trigger = Trigger({
              'name': name,
              'stream': stream,
              'triggerImpl': triggerImpl
            });
            0, await trigger.stop();
            const stop = monitor.log(triggerImpl, {
              'clear': true
            });
            expected(trigger).toHave({
              'state': TriggerState.nonStarted
            });
            expected(stop.calls).equalTo(0);
          }
        });
        test("when started, impl.stop() must be called", async () => {
          {
            const triggerImpl = monitor(TriggerImpl(), {
              'method': "stop"
            });
            const stream = JobCallStream();
            const trigger = (0, await Trigger({
              'name': name,
              'stream': stream,
              'triggerImpl': triggerImpl
            }).start());
            0, await trigger.stop();
            const stop = monitor.log(triggerImpl, {
              'clear': true
            });
            expected(stop.calls).equalTo(1);
          }
        });
        test("when callback set, this must be called", async () => {
          {
            const triggerImpl = TriggerImpl();
            const callback = monitor(_core.dogma.nop());
            const stream = JobCallStream();
            const trigger = (0, await Trigger({
              'name': name,
              'stream': stream,
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
        test("when trigger is stopped, error must be raised", async () => {
          {
            const triggerImpl = TriggerImpl();
            const stream = JobCallStream();
            const trigger = (0, await (0, await Trigger({
              'name': name,
              'stream': stream,
              'triggerImpl': triggerImpl
            }).start()).stop());
            const e = {
              ["ts"]: (0, _core.timestamp)(),
              ["call"]: call,
              ["last"]: false
            };
            const out = await _core.dogma.pawait(() => triggerImpl.fireEvent(e));
            expected(out).first.equalTo(false).second.equalTo(TypeError("Trigger is stopped."));
          }
        });
        test("when started and called, call must be streamed", async () => {
          {
            const triggerImpl = monitor(TriggerImpl(), {
              'method': "stop"
            });
            const stream = monitor(JobCallStream(), {
              'method': "append"
            });
            const trigger = (0, await Trigger({
              'name': name,
              'stream': stream,
              'triggerImpl': triggerImpl
            }).start());
            const e = {
              ["ts"]: (0, _core.timestamp)(),
              ["call"]: call,
              ["last"]: false
            };
            0, await triggerImpl.fireEvent(e);
            expected(trigger.state).equalTo(TriggerState.started);
            const append = monitor.log(stream, {
              'clear': true
            });
            expected(append.calls).equalTo(1);
            expected(append.calledWith([call])).equalTo(1);
            const stop = monitor.log(triggerImpl, {
              'clear': true
            });
            expected(stop.calls).equalTo(0);
          }
        });
        test("when started and called with last event, impl.stop() and stream.end() must be called", async () => {
          {
            const triggerImpl = monitor(TriggerImpl(), {
              'method': "stop"
            });
            const stream = monitor(JobCallStream(), {
              'method': "end"
            });
            const trigger = (0, await Trigger({
              'name': name,
              'stream': stream,
              'triggerImpl': triggerImpl
            }).start());
            const e = {
              ["ts"]: (0, _core.timestamp)(),
              ["call"]: call,
              ["last"]: true
            };
            0, await triggerImpl.fireEvent(e);
            expected(trigger.state).equalTo(TriggerState.stopped);
            const end = monitor.log(stream, {
              'clear': true
            });
            expected(end.calls).equalTo(1);
            const stop = monitor.log(triggerImpl, {
              'clear': true
            });
            expected(stop.calls).equalTo(1);
          }
        });
        test("when job is __exit__, impl.stop() and stream.end() must be called", async () => {
          {
            const triggerImpl = monitor(TriggerImpl(), {
              'method': "stop"
            });
            const stream = monitor(JobCallStream(), {
              'method': "end"
            });
            const trigger = (0, await Trigger({
              'name': name,
              'stream': stream,
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
            const end = monitor.log(stream, {
              'clear': true
            });
            expected(end.calls).equalTo(1);
            const stop = monitor.log(triggerImpl, {
              'clear': true
            });
            expected(stop.calls).equalTo(1);
          }
        });
      }
    });
  }
});