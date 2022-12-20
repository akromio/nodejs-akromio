"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const RequiredConstraint = _core.dogma.use(require("./RequiredConstraint"));
const ConstraintError = _core.dogma.use(require("./ConstraintError"));
suite(__filename, () => {
  {
    suite("validateValue()", () => {
      {
        test("when value is nil, a constraint error must be raised", () => {
          {
            const out = _core.dogma.peval(() => {
              return RequiredConstraint().validateValue(null);
            });
            expected(out).it(0).equalTo(false).it(1).toBe(ConstraintError).like("A value is required.");
          }
        });
        test("when value is not nil, no error must be raised", () => {
          {
            RequiredConstraint().validateValue("hello!");
          }
        });
      }
    });
  }
});