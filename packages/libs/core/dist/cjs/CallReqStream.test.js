"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const CallReqStream = _core.dogma.use(require("./CallReqStream"));
suite(__filename, () => {
  {
    suite("append()", () => {
      {
        test("when request added, push() must be called", () => {
          {
            const call = {
              ["jobName"]: "job-name",
              ["args"]: []
            };
            const stream = monitor(CallReqStream(), {
              'method': "push"
            }).append(call);
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
  }
});