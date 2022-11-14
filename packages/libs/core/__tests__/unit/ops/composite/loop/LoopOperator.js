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
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const {
  DynamicLoop,
  LoopOperator,
  StaticAction,
  ActionOperator
} = _core.dogma.use(require("../../../../.."));
suite(__filename, () => {
  {
    const globalDataset = GlobalDataset({
      'name': "global"
    });
    const log = simulator.stream.duplex();
    suite("performWorks()", () => {
      {
        const $TestLoop = class TestLoop extends DynamicLoop {
          constructor(_) {
            super(_);
            /* c8 ignore start */
            if (_ == null) _ = {};
            /* c8 ignore stop */ /* c8 ignore start */
            if (this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___init__ instanceof Function) this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___init__(_); /* c8 ignore stop */
            /* c8 ignore start */
            if (this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___post__ instanceof Function) this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___post__(); /* c8 ignore stop */
            /* c8 ignore start */
            if (this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___validate__ instanceof Function) this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___validate__(); /* c8 ignore stop */
          }
        };

        const TestLoop = new Proxy($TestLoop, {
          apply(receiver, self, args) {
            return new $TestLoop(...args);
          }
        });
        TestLoop.prototype.getCollection = function () {
          const self = this;
          {
            return {
              ["title"]: "get collection",
              ["op"]: StaticAction({
                'name': "coll",
                'fun': () => {
                  {
                    return [1, 2];
                  }
                },
                'operator': ActionOperator()
              }),
              ["onError"]: "carryOn"
            };
          }
        };
        TestLoop.prototype.getSteps = function () {
          const self = this;
          {
            return [{
              ["title"]: "1st step",
              ["op"]: StaticAction({
                'name': "1st",
                'fun': ctx => {
                  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
                  let {
                    params
                  } = ctx;
                  {
                    return `action #${params}`;
                  }
                },
                'operator': ActionOperator()
              }),
              ["args"]: "$(i)",
              ["onError"]: "carryOn"
            }, {
              ["title"]: "2nd step",
              ["op"]: StaticAction({
                'name': "2nd",
                'fun': ctx => {
                  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
                  let {
                    params
                  } = ctx;
                  {
                    return params;
                  }
                },
                'operator': ActionOperator()
              }),
              ["args"]: "action $(i)",
              ["resultVarName"]: "2nd",
              ["onError"]: "carryOn"
            }, {
              ["title"]: "3rd step",
              ["op"]: StaticAction({
                'name': "3rd",
                'fun': ctx => {
                  /* c8 ignore next */_core.dogma.expect("ctx", ctx, _core.map);
                  let {
                    params
                  } = ctx;
                  {
                    return params;
                  }
                },
                'operator': ActionOperator()
              }),
              ["args"]: "action $(i)",
              ["resultVarName"]: "3rd",
              ["onError"]: "carryOn",
              ["quiet"]: true
            }];
          }
        };
        test("when called and everything is alright, a result for every step must be returned as value", async () => {
          {
            const loop = TestLoop({
              'name': "loop",
              'operator': LoopOperator()
            });
            const out = (0, await loop.run({
              'dataset': globalDataset,
              'log': log
            }));
            expected(out).toBe("Result").toHave({
              'title': "loop",
              'kind': "ok",
              'onError': "carryOn"
            });
            expected(out.value).toBeList().toHaveLen(5).it(0).toBe("Result").toHave({
              'title': "coll",
              'kind': "ok",
              'value': [1, 2]
            }).it(1).toBe("Result").toHave({
              'title': "1st",
              'kind': "ok",
              'value': "action #1"
            }).it(2).toBe("Result").toHave({
              'title': "2nd",
              'kind': "ok",
              'value': "action 1"
            }).it(3).toBe("Result").toHave({
              'title': "1st",
              'kind': "ok",
              'value': "action #2"
            }).it(4).toBe("Result").toHave({
              'title': "2nd",
              'kind': "ok",
              'value': "action 2"
            });
          }
        });
        test("when onError is finish and error, break must be perform and value contains the results", async () => {
          {
            const $TestLoop = class TestLoop extends DynamicLoop {
              constructor(_) {
                super(_);
                /* c8 ignore start */
                if (_ == null) _ = {};
                /* c8 ignore stop */ /* c8 ignore start */
                if (this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___init__ instanceof Function) this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___init__(_); /* c8 ignore stop */
                /* c8 ignore start */
                if (this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___post__ instanceof Function) this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___post__(); /* c8 ignore stop */
                /* c8 ignore start */
                if (this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___validate__ instanceof Function) this._pvt_a61cdb1eeb0b37d91a41c5be3a73453e___validate__(); /* c8 ignore stop */
              }
            };

            const TestLoop = new Proxy($TestLoop, {
              apply(receiver, self, args) {
                return new $TestLoop(...args);
              }
            });
            TestLoop.prototype.getCollection = function () {
              const self = this;
              {
                return {
                  ["title"]: "get collection",
                  ["op"]: StaticAction({
                    'name': "coll",
                    'fun': () => {
                      {
                        return [1, 2];
                      }
                    },
                    'operator': ActionOperator()
                  }),
                  ["onError"]: "carryOn",
                  ["resultVarName"]: "j"
                };
              }
            };
            TestLoop.prototype.getSteps = function () {
              const self = this;
              {
                return [{
                  ["title"]: "1st step",
                  ["op"]: StaticAction({
                    'name': "1st",
                    'fun': () => {
                      {
                        _core.dogma.raise(Error("error!"));
                      }
                    },
                    'operator': ActionOperator()
                  }),
                  ["args"]: 123,
                  ["onError"]: "finish"
                }, {
                  ["title"]: "2nd step",
                  ["op"]: StaticAction({
                    'name': "2nd",
                    'fun': () => {
                      {
                        return "action #2";
                      }
                    },
                    'operator': ActionOperator()
                  }),
                  ["args"]: 321,
                  ["resultVarName"]: "2nd",
                  ["onError"]: "carryOn"
                }];
              }
            };
            const loop = TestLoop({
              'name': "loop",
              'operator': LoopOperator()
            });
            const out = (0, await loop.run({
              'dataset': globalDataset,
              'log': log
            }));
            expected(out).toBe("Result").toHave({
              'title': "loop",
              'kind': "failed",
              'onError': "carryOn"
            });
            expected(out.value).toBeList().toHaveLen(2).it(0).toBe("Result").toHave({
              'title': "coll",
              'kind': "ok",
              'value': [1, 2]
            }).it(1).toBe("Result").toHave({
              'title': "1st",
              'kind': "failed",
              'value': Error("error!")
            });
          }
        });
      }
    });
  }
});