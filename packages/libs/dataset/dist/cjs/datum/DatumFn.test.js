"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const DatumFn = _core.dogma.use(require("./DatumFn"));
const DatumError = _core.dogma.use(require("./DatumError"));
suite(__filename, () => {
  {
    suite("getValue()", () => {
      {
        test("when getValue called, function must be called and its value returned", () => {
          {
            const datum = DatumFn({
              'name': "f",
              'value': () => {
                {
                  return 123;
                }
              }
            });
            const out = datum.getValue();
            expected(out).equalTo(123);
          }
        });
      }
    });
    suite("setValue()", () => {
      {
        test("when setValue called, error must be raised", () => {
          {
            const datum = DatumFn({
              'name': "f",
              'value': () => {
                {
                  return 123;
                }
              }
            });
            const out = _core.dogma.peval(() => {
              return datum.setValue(321);
            });
            expected(out).it(0).equalTo(false).it(1).toBe(DatumError).like("Datum 'f' is not updatable.");
          }
        });
      }
    });
  }
});