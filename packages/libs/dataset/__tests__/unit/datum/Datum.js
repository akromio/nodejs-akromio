"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  Datum
} = _core.dogma.use(require("../../.."));
const $TestDatum = class TestDatum extends Datum {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_30050a8beaf3c8f638d54df1c6a88da7___init__ instanceof Function) this._pvt_30050a8beaf3c8f638d54df1c6a88da7___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_30050a8beaf3c8f638d54df1c6a88da7___post__ instanceof Function) this._pvt_30050a8beaf3c8f638d54df1c6a88da7___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_30050a8beaf3c8f638d54df1c6a88da7___validate__ instanceof Function) this._pvt_30050a8beaf3c8f638d54df1c6a88da7___validate__(); /* c8 ignore stop */
  }
};

const TestDatum = new Proxy($TestDatum, {
  apply(receiver, self, args) {
    return new $TestDatum(...args);
  }
});
suite(__filename, () => {
  {
    suite("hasTag()", () => {
      {
        test("when datum has tag, true must be returned", () => {
          {
            const datum = TestDatum({
              'name': "test",
              'tags': ["password"]
            });
            const out = datum.hasTag("password");
            expected(out).equalTo(true);
          }
        });
        test("when datum hasn't tag, false must be returned", () => {
          {
            const datum = TestDatum({
              'name': "test"
            });
            const out = datum.hasTag("password");
            expected(out).equalTo(false);
          }
        });
      }
    });
  }
});