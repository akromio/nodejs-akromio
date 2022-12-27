"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  Ops,
  CoOperator
} = _core.dogma.use(require("@akromio/core"));
const CatalogCo = _core.dogma.use(require("./CatalogCo"));
suite(__filename, () => {
  {
    suite("constructor", () => {
      {
        test("when instantiation, new instance must be returned", () => {
          {
            const operator = CoOperator();
            const ops = Ops();
            const steps = [];
            const out = CatalogCo({
              'name': "test",
              'steps': steps,
              'ops': ops,
              'operator': operator
            });
            expected(out).toBe(CatalogCo);
          }
        });
      }
    });
  }
});