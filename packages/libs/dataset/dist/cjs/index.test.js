"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const index = _core.dogma.use(require("./index"));
suite(__filename, () => {
  {
    test("when imported, the exported items must be accessible", () => {
      {
        expected(index).toHave("Datum").members("Dataset", "GlobalDataset", "LocalDataset", "DatasetParser", "DatasetDescriber", "ConstDatum", "VarDatum", "DatumFn", "DatumError", "Constraints", "ConstraintError", "DataTypeConstraint", "RequiredConstraint").toBeCallable();
      }
    });
  }
});