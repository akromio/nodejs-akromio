"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const DataTypeConstraint = _core.dogma.use(require("./DataTypeConstraint"));
const ConstraintError = _core.dogma.use(require("./ConstraintError"));
suite(__filename, () => {
  {
    suite("validateValue()", () => {
      {
        suite("any as data type", () => {
          {
            const constraint = DataTypeConstraint({
              'dataType': "any"
            });
            test("when nil not received, no error must be raised", () => {
              {
                expected(() => {
                  {
                    constraint.validateValue(true);
                  }
                }).notToRaise();
              }
            });
            test("when nil received, constraint error must be raised", () => {
              {
                const out = _core.dogma.peval(() => {
                  return constraint.validateValue(null);
                });
                expected(out).it(0).toBe(false).it(1).toBe(ConstraintError).like("Any value expected. Got: nil.");
              }
            });
          }
        });
        suite("text as data type", () => {
          {
            const constraint = DataTypeConstraint({
              'dataType': "text"
            });
            test("when text received, text must be returned", () => {
              {
                const value = "hello!";
                const out = constraint.validateValue(value);
                expected(out).equalTo(value);
              }
            });
            test("when text not received, constraint error must be raised", () => {
              {
                const out = _core.dogma.peval(() => {
                  return constraint.validateValue(123);
                });
                expected(out).it(0).toBe(false).it(1).toBe(ConstraintError).like("Text expected. Got: num.");
              }
            });
          }
        });
        suite("num as data type", () => {
          {
            const constraint = DataTypeConstraint({
              'dataType': "num"
            });
            test("when num received, num must be returned", () => {
              {
                const value = 123;
                const out = constraint.validateValue(value);
                expected(out).equalTo(value);
              }
            });
            test("when text received, num must be returned", () => {
              {
                const value = "123";
                const out = constraint.validateValue(value);
                expected(out).equalTo(123);
              }
            });
            test("when neither num nor text, constraint error must be raised", () => {
              {
                const out = _core.dogma.peval(() => {
                  return constraint.validateValue(true);
                });
                expected(out).it(0).toBe(false).it(1).toBe(ConstraintError).like("Number expected. Got: bool.");
              }
            });
          }
        });
        suite("bool as data type", () => {
          {
            const constraint = DataTypeConstraint({
              'dataType': "bool"
            });
            test("when bool received, no error must be raised", () => {
              {
                expected(() => {
                  {
                    constraint.validateValue(true);
                  }
                }).notToRaise();
              }
            });
            test("when value is text and this is true, true is returned", () => {
              {
                for (const value of [true, "t", "true", "y", "yes"]) {
                  expected(constraint.validateValue(value)).equalTo(true);
                }
              }
            });
            test("when value is text and this is false, false is returned", () => {
              {
                for (const value of [false, "f", "false", "n", "no"]) {
                  expected(constraint.validateValue(value)).equalTo(false);
                }
              }
            });
            test("when bool not received, constraint error must be raised", () => {
              {
                const out = _core.dogma.peval(() => {
                  return constraint.validateValue("hello!");
                });
                expected(out).it(0).toBe(false).it(1).toBe(ConstraintError).like("Boolean expected. Got: text.");
              }
            });
          }
        });
        suite("list as data type", () => {
          {
            const constraint = DataTypeConstraint({
              'dataType': "list"
            });
            test("when list received, no error must be raised", () => {
              {
                expected(() => {
                  {
                    constraint.validateValue([]);
                  }
                }).notToRaise();
              }
            });
            test("when list not received, constraint error must be raised", () => {
              {
                const out = _core.dogma.peval(() => {
                  return constraint.validateValue("hello!");
                });
                expected(out).it(0).toBe(false).it(1).toBe(ConstraintError).like("List expected. Got: text.");
              }
            });
          }
        });
      }
    });
  }
});