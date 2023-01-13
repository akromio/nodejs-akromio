"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const SimpleOp = _core.dogma.use(require("./SimpleOp"));
const $TestOp = class TestOp extends SimpleOp {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_56c404d3763b97778c47720236380339___init__ instanceof Function) this._pvt_56c404d3763b97778c47720236380339___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_56c404d3763b97778c47720236380339___post__ instanceof Function) this._pvt_56c404d3763b97778c47720236380339___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_56c404d3763b97778c47720236380339___validate__ instanceof Function) this._pvt_56c404d3763b97778c47720236380339___validate__(); /* c8 ignore stop */
  }
};

const TestOp = new Proxy($TestOp, {
  apply(receiver, self, args) {
    return new $TestOp(...args);
  }
});
suite(__filename, () => {
  {
    suite("state", () => {
      {
        test("when plugin op, the plugin state must be returned", () => {
          {
            const op = TestOp({
              'name': "op",
              'parentPlugin': {
                ["state"]: "hello"
              },
              'operator': {}
            });
            const out = op.state;
            expected(out).equalTo("hello");
          }
        });
        test("when standalone op, nil must be returned", () => {
          {
            const op = TestOp({
              'name': "op",
              'operator': {}
            });
            const out = op.state;
            expected(out).toBeNil();
          }
        });
      }
    });
    suite("buildParams()", () => {
      {
        test("when parameterizer set, this is run and its return must be returned", () => {
          {
            const args = {};
            const out = TestOp({
              'name': "the name",
              'parameterizer': args => {
                {
                  return [];
                }
              },
              'operator': {}
            }).buildParams(args);
            expected(out).equalTo([]);
          }
        });
        test("when parameterizer set and datasource passed, args must be evaluated", () => {
          {
            const args = "$(hello)";
            const ds = simulator({
              'eval': method.returns("hola")
            });
            const out = TestOp({
              'name': "the name",
              'parameterizer': args => {
                /* c8 ignore next */_core.dogma.expect("args", args);
                {
                  return [args];
                }
              },
              'operator': {}
            }).buildParams(args, ds);
            expected(out).equalTo(["hola"]);
          }
        });
        test("when parameterizer unset, the args must be returned", () => {
          {
            const args = {
              ["x"]: 1
            };
            const out = TestOp({
              'name': "the name",
              'operator': {}
            }).buildParams(args);
            expected(out).sameAs(args);
          }
        });
      }
    });
    suite("buildTest()", () => {
      {
        suite("when title set", () => {
          {
            test("when title is text, this must be returned", () => {
              {
                const out = TestOp({
                  'name': "the name",
                  'title': "the title",
                  'operator': {}
                }).buildTitle();
                expected(out).equalTo("the title");
              }
            });
            test("when title is fn, the function is run and its return must be returned", () => {
              {
                const out = TestOp({
                  'name': "the name",
                  'title': () => {
                    {
                      return "the title";
                    }
                  },
                  'operator': {}
                }).buildTitle();
                expected(out).equalTo("the title");
              }
            });
          }
        });
        test("when title unset, the op name must be returned", () => {
          {
            const out = TestOp({
              'name': "the name",
              'operator': {}
            }).buildTitle();
            expected(out).equalTo("the name");
          }
        });
      }
    });
  }
});