"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  fun
} = _core.dogma.use(require("@akromio/doubles"));
const CallReqStream = _core.dogma.use(require("./CallReqStream"));
suite(__filename, () => {
  {
    suite("appendDataRecollector()", () => {
      {
        test("when called, the recollector must be pushed to dataRecollectors", () => {
          {
            const stream = CallReqStream();
            const out = stream.appendDataRecollector(_core.dogma.nop());
            expected(out).sameAs(stream);
            expected(stream.dataRecollectors).toHaveLen(1).first.toBeFn();
          }
        });
      }
    });
    suite("appendCallReq()", () => {
      {
        test("when request added, push() must be called", () => {
          {
            const call = {
              ["jobName"]: "job-name",
              ["args"]: []
            };
            const stream = monitor(CallReqStream(), {
              'method': "push"
            }).appendCallReq(call);
            const push = monitor.log(stream, {
              'clear': true
            });
            expected(push.calls).equalTo(1);
            expected(push.call.args).equalTo([call]);
          }
        });
      }
    });
    suite("end()", () => {
      {
        test("when called, nil must be pushed", () => {
          {
            const stream = monitor(CallReqStream(), {
              'method': "push"
            }).end();
            const push = monitor.log(stream, {
              'clear': true
            });
            expected(push.calls).equalTo(1);
            expected(push.call.args).equalTo([null]);
          }
        });
      }
    });
    suite("_read()", () => {
      {
        test("when read() called w/ empty stream, _read() must be called", () => {
          {
            const gather = monitor(fun.returns());
            const stream = monitor(CallReqStream({
              'dataRecollectors': [gather]
            }), {
              'method': "_read"
            });
            const out = stream.read();
            const read = monitor.log(stream, {
              'clear': true
            });
            expected(read.calls).equalTo(1);
            const glog = monitor.log(gather, {
              'clear': true
            });
            expected(glog.calls).equalTo(1);
            expected(glog.call.args).toHaveLen(1).first.toBeNum().greaterThan(0);
          }
        });
      }
    });
  }
});