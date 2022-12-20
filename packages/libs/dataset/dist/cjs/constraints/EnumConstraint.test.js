"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const EnumConstraint = _core.dogma.use(require("./EnumConstraint"));
const ConstraintError = _core.dogma.use(require("./ConstraintError"));
suite(__filename, () => {
  {
    suite("validateValue()", () => {
      {
        const constraint = EnumConstraint({
          'options': ["one", "two", "three"]
        });
        test("when valid value, value must be returned", () => {
          {
            const out = constraint.validateValue("two");
            expected(out).equalTo("two");
          }
        });
        test("when invlaid value, error must be raised", () => {
          {
            const out = _core.dogma.peval(() => {
              return constraint.validateValue("four");
            });
            expected(out).it(0).equalTo(false).it(1).toBe(ConstraintError).like("Invalid value. Got: four. Expected: one,two,three.");
          }
        });
      }
    });
  }
});