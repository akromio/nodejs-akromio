"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const Datum = _core.dogma.use(require("./Datum"));
const $TestDatum = class TestDatum extends Datum {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_1e9815c75a8b7c638da96c7ad0b2b413___init__ instanceof Function) this._pvt_1e9815c75a8b7c638da96c7ad0b2b413___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1e9815c75a8b7c638da96c7ad0b2b413___post__ instanceof Function) this._pvt_1e9815c75a8b7c638da96c7ad0b2b413___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1e9815c75a8b7c638da96c7ad0b2b413___validate__ instanceof Function) this._pvt_1e9815c75a8b7c638da96c7ad0b2b413___validate__(); /* c8 ignore stop */
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