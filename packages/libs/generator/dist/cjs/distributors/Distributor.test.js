"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  sim,
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const DistributorBase = _core.dogma.use(require("./Distributor"));
const $Distributor = class Distributor extends DistributorBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_575e39b1ead75622983b012b4543ea5d___init__ instanceof Function) this._pvt_575e39b1ead75622983b012b4543ea5d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_575e39b1ead75622983b012b4543ea5d___post__ instanceof Function) this._pvt_575e39b1ead75622983b012b4543ea5d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_575e39b1ead75622983b012b4543ea5d___validate__ instanceof Function) this._pvt_575e39b1ead75622983b012b4543ea5d___validate__(); /* c8 ignore stop */
  }
};

const Distributor = new Proxy($Distributor, {
  apply(receiver, self, args) {
    return new $Distributor(...args);
  }
});
Distributor.prototype.deliver = function (req) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("req", req);
  {
    _core.dogma.nop();
  }
};
suite(__filename, () => {
  {
    const registry = "registry";
    const catalog = "catalog-name";
    suite("deliver()", () => {
      {
        test("when called, input stream read and _delivery() run for each request", async () => {
          {
            const ts = (0, _core.timestamp)().valueOf();
            const assignTs = ts;
            const reqs = [{
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "#1",
              ["assignee"]: "one"
            }, {
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "#2",
              ["assignee"]: "two"
            }, {
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "#1",
              ["assignee"]: "three"
            }, {
              ["ts"]: ts,
              ["assignTs"]: assignTs,
              ["registry"]: registry,
              ["catalog"]: catalog,
              ["job"]: "#3",
              ["assignee"]: "one"
            }];
            const input = sim.stream.readable({
              'objectMode': true,
              'data': reqs
            });
            const distributor = monitor(Distributor({
              'input': input
            }), {
              'method': "deliver"
            });
            distributor.start();
            0, await (0, _core.sleep)("100ms");
            const deliver = monitor.log(distributor, {
              'clear': true
            });
            expected(deliver.calls).equalTo(4);
            expected(deliver.getCall(0).args).get("[0].job").equalTo("#1");
            expected(deliver.getCall(1).args).get("[0].job").equalTo("#2");
            expected(deliver.getCall(2).args).get("[0].job").equalTo("#1");
            expected(deliver.getCall(3).args).get("[0].job").equalTo("#3");
          }
        });
      }
    });
  }
});