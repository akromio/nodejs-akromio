"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const index = _core.dogma.use(require("./index"));
suite(__filename, () => {
  {
    test("when imported, api must be exported", () => {
      {
        expected(index).toHave(["StarterState", "Starter", "ConstStarter", "ExitStarter", "IncStarter", "SleepStarter", "Assigner", "RandomAssigner", "Ring", "Distributor", "DistributorBase", "Distributors", "ConsoleDistributor", "RedisPubSubDistributor", "RedisStreamsDistributor"]);
      }
    });
  }
});