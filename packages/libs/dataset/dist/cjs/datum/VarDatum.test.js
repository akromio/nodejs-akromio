"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const Constraints = _core.dogma.use(require("../constraints/Constraints"));
const DataTypeConstraint = _core.dogma.use(require("../constraints/DataTypeConstraint"));
const ConstraintError = _core.dogma.use(require("../constraints/ConstraintError"));
const VarDatum = _core.dogma.use(require("./VarDatum"));
suite(__filename, () => {
  {
    suite("setValue()", () => {
      {
        test("when setValue called, its value can be updated", () => {
          {
            const datum = VarDatum({
              'name': "v",
              'value': 123
            });
            const out = _core.dogma.peval(() => {
              return datum.setValue(321);
            });
            expected(out).it(0).equalTo(true).it(1).sameAs(datum);
          }
        });
        test("when setValue called and some constraint is not passed, error must be raised", () => {
          {
            const constraints = Constraints().appendConstraint(DataTypeConstraint({
              'dataType': "num"
            }));
            const datum = VarDatum({
              'name': "v",
              'value': 123,
              'constraints': constraints
            });
            const out = _core.dogma.peval(() => {
              return datum.setValue(true);
            });
            expected(out).it(0).equalTo(false).it(1).toBe(ConstraintError).like("Number expected");
          }
        });
      }
    });
  }
});