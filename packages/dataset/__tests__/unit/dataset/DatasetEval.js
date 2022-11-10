"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  GlobalDataset
} = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    suite("eval()", () => {
      {
        const ds = GlobalDataset({
          'name': "global"
        });
        setup(() => {
          {
            ds.setDatumValue("hello", "hola");
            ds.setDatumValue("num", 123);
          }
        });
        for (const arg of [123, false, _core.dogma.nop(), null, undefined]) {
          test(`when exp is ${(0, _core.typename)(arg)}, this must be returned`, () => {
            {
              const out = ds.eval(arg);
              expected(out).equalTo(arg);
            }
          });
        }
        suite("when text", () => {
          {
            test("when expressions, these must be evaluated and their values returned", () => {
              {
                const out = ds.eval("$(hello) != $(num)", ds);
                expected(out).equalTo("hola != 123");
              }
            });
            test("when only $(*), the datasource repr must be returned", () => {
              {
                const out = ds.eval("$(*)", ds);
                expected(out).equalTo({
                  'hello': "hola",
                  'num': 123
                });
              }
            });
            test("when only $(id), its value must be returned", () => {
              {
                const out = ds.eval("$(num)", ds);
                expected(out).equalTo(123);
              }
            });
            test("when exp contains no ref, this must be returned", () => {
              {
                const out = ds.eval("${hello} != ${num}", ds);
                expected(out).equalTo("${hello} != ${num}");
              }
            });
          }
        });
        test("when exp is a list, its items must be evaluated", () => {
          {
            const out = ds.eval(["$(num)21", 123456]);
            expected(out).equalTo(["12321", 123456]);
          }
        });
        test("when exp is a map, its items must be evaluated", () => {
          {
            const out = ds.eval({
              'x': "$(num)21",
              'y': 123456
            });
            expected(out).equalTo({
              'x': "12321",
              'y': 123456
            });
          }
        });
      }
    });
  }
});