"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  Constraints,
  DataTypeConstraint,
  EnumConstraint
} = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    suite("findConstraintByType()", () => {
      {
        test("when constraint exists, this must be returned", () => {
          {
            const dataTypeConstraint = DataTypeConstraint({
              'dataType': "text"
            });
            const enumConstraint = EnumConstraint({
              'options': ["one", "two", "three"]
            });
            const constraints = Constraints().appendConstraint(dataTypeConstraint).appendConstraint(enumConstraint);
            const out = constraints.findConstraintByType(EnumConstraint);
            expected(out).sameAs(enumConstraint);
          }
        });
        test("when constraint not exists, nil must be returned", () => {
          {
            const constraints = Constraints();
            const out = constraints.findConstraintByType(EnumConstraint);
            expected(out).toBeNil();
          }
        });
      }
    });
  }
});