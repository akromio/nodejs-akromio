"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const StaticAction = _core.dogma.use(require("./StaticAction"));
const ActionOperator = _core.dogma.use(require("./ActionOperator"));
suite(__filename, () => {
  {
    const dataset = GlobalDataset({
      'name': "global"
    }).setDatumValue("x", 123);
    const log = simulator.stream.duplex();
    const runnerName = "runner#0";
    suite("performWork()", () => {
      {
        test("when called, fun must be called and its return must be returned into Result.value", async () => {
          {
            const fun = () => {
              {
                return "ciao!";
              }
            };
            const operator = ActionOperator();
            const action = StaticAction({
              'name': "test",
              'title': "the title",
              'fun': fun,
              'operator': operator
            });
            const out = (0, await action.runWith("$(x)", {
              'dataset': dataset,
              'runnerName': runnerName,
              'log': log
            }));
            expected(out).toBe("Result").toHave({
              'title': "the title",
              'kind': "ok",
              'value': "ciao!",
              'onError': "carryOn"
            }).member("callId").toBeUuid().member("duration").toBeNum();
          }
        });
      }
    });
  }
});