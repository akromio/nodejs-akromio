"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const Call = _core.dogma.use(require("../Call"));
const Action = _core.dogma.use(require("../simple/action/Action"));
const CompositeOpBase = _core.dogma.use(require("./CompositeOp"));
const $CompositeOp = class CompositeOp extends CompositeOpBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_4c7b0db8f111d72f1bf84887fbbef74d___init__ instanceof Function) this._pvt_4c7b0db8f111d72f1bf84887fbbef74d___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4c7b0db8f111d72f1bf84887fbbef74d___post__ instanceof Function) this._pvt_4c7b0db8f111d72f1bf84887fbbef74d___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4c7b0db8f111d72f1bf84887fbbef74d___validate__ instanceof Function) this._pvt_4c7b0db8f111d72f1bf84887fbbef74d___validate__(); /* c8 ignore stop */
  }
};

const CompositeOp = new Proxy($CompositeOp, {
  apply(receiver, self, args) {
    return new $CompositeOp(...args);
  }
});
suite(__filename, () => {
  {
    suite("buildTitle()", () => {
      {
        test("when title set, this must be returned", () => {
          {
            const out = CompositeOp({
              'name': "the name",
              'title': "the title",
              'operator': {}
            }).buildTitle();
            expected(out).equalTo("the title");
          }
        });
        test("when title unset, the op name must be returned", () => {
          {
            const out = CompositeOp({
              'name': "the name",
              'operator': {}
            }).buildTitle();
            expected(out).equalTo("the name");
          }
        });
      }
    });
    suite("getSteps()", () => {
      {
        test("when not overwritten, empty list must be returned", () => {
          {
            const out = CompositeOp({
              'name': "the name",
              'title': "the title",
              'operator': {}
            }).getSteps(simulator(Call, {}));
            expected(out).toBeEmpty();
          }
        });
      }
    });
  }
});