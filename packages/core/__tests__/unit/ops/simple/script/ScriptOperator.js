"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Script,
  ScriptOperator,
  Result
} = _core.dogma.use(require("../../../../.."));
suite(__filename, () => {
  {
    const dataset = GlobalDataset({
      'name': "global"
    }).setDatumValue("x", 123);
    const log = simulator.stream.duplex();
    suite("performWork()", () => {
      {
        suite("sync code", () => {
          {
            test("when called w/o params, default params must be used", async () => {
              {
                const code = "params.join(':')";
                const operator = ScriptOperator();
                const script = Script({
                  'name': "test",
                  'title': "the title",
                  'code': code,
                  'operator': operator,
                  'params': [1, 2, 3, 4]
                });
                const out = (0, await script.runWith(undefined, {
                  'dataset': dataset,
                  'log': log
                }));
                expected(out).toBe(Result).toHave({
                  'title': "the title",
                  'kind': "ok",
                  'value': "1:2:3:4",
                  'onError': "carryOn"
                }).member("callId").toBeUuid().member("duration").toBeNum();
              }
            });
            test("when called w/ params, these must be used", async () => {
              {
                const code = "params.join(':')";
                const operator = ScriptOperator();
                const script = Script({
                  'name': "test",
                  'title': "the title",
                  'code': code,
                  'operator': operator,
                  'params': [1, 2, 3, 4]
                });
                const out = (0, await script.runWith([12, 34], {
                  'dataset': dataset,
                  'log': log
                }));
                expected(out).toBe(Result).toHave({
                  'title': "the title",
                  'kind': "ok",
                  'value': "12:34",
                  'onError': "carryOn"
                }).member("callId").toBeUuid().member("duration").toBeNum();
              }
            });
          }
        });
        suite("async code", () => {
          {
            test("when call as async, async run must be performed", async () => {
              {
                const code = "new Promise(function(resolve, reject) {\nsetTimeout(() => resolve(1234), 250);\n});";
                const operator = ScriptOperator();
                const script = Script({
                  'name': "test",
                  'kind': "async",
                  'code': code,
                  'operator': operator
                });
                const out = (0, await script.runWith(undefined, {
                  'dataset': dataset,
                  'log': log
                }));
                expected(out).toBe(Result).toHave({
                  'title': "test",
                  'value': 1234,
                  'kind': "ok",
                  'onError': "carryOn"
                }).member("callId").toBeUuid().member("duration").toBeNum().greaterThanOrEqualTo(250);
              }
            });
          }
        });
      }
    });
  }
});