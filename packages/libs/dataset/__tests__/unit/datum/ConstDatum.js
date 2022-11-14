"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  ConstDatum,
  DatumError
} = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    suite("setValue()", () => {
      {
        test("when setValue called, error must be raised", () => {
          {
            const datum = ConstDatum({
              'name': "c",
              'value': 123
            });
            const out = _core.dogma.peval(() => {
              return datum.setValue(321);
            });
            expected(out).it(0).equalTo(false).it(1).toBe(DatumError).like("The datum 'c' is not updatable.");
          }
        });
      }
    });
  }
});