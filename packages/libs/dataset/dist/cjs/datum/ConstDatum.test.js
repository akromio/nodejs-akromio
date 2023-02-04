"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const ConstDatum = _core.dogma.use(require("./ConstDatum"));
const DatumError = _core.dogma.use(require("./DatumError"));
suite(__filename, () => {
  {
    suite("post", () => {
      {
        test("when merge exists, this must be merged to the value", () => {
          {
            const out = ConstDatum({
              'name': "c",
              'merge': {
                ["y"]: 2
              },
              'value': {
                ["x"]: 1,
                ["z"]: 3
              }
            });
            expected(out.getValue()).equalTo({
              'x': 1,
              'y': 2,
              'z': 3
            });
          }
        });
      }
    });
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
            expected(out).it(0).equalTo(false).it(1).toBe(DatumError).like("Datum 'c' is not updatable.");
          }
        });
      }
    });
  }
});