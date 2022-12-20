"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const VarDatum = _core.dogma.use(require("../datum/VarDatum"));
const ConstDatum = _core.dogma.use(require("../datum/ConstDatum"));
const GlobalDataset = _core.dogma.use(require("./GlobalDataset"));
const LocalDataset = _core.dogma.use(require("./LocalDataset"));
const DatasetParser = _core.dogma.use(require("./DatasetParser"));
suite(__filename, () => {
  {
    const inheritedDatum = ConstDatum({
      'name': "inherited",
      'value': "xyz"
    });
    const globalDs = GlobalDataset({
      'name': "global"
    }).setDatum(inheritedDatum);
    const parser = DatasetParser();
    suite("parse()", () => {
      {
        test("when declaration contains valid declarations, a dataset must be returned with these", () => {
          {
            const args = {
              ["i1"]: "input #1",
              ["i2"]: "input #2"
            };
            const dataset = LocalDataset({
              'name': "local",
              'parent': globalDs
            }).setDatum(ConstDatum({
              'name': "args",
              'value': args
            }));
            const out = parser.parse([{
              ["var"]: "v",
              ["value"]: 123,
              ["dataType"]: "num",
              ["desc"]: "A description."
            }, {
              ["const"]: "c",
              ["value"]: "$(v) 321",
              ["required"]: true
            }, {
              ["fn"]: "f",
              ["value"]: () => {
                {
                  return 123;
                }
              }
            }, {
              ["var"]: "d",
              ["value"]: "$(unknown)",
              ["defaultValue"]: "this is the default"
            }, {
              ["var"]: "e",
              ["value"]: "one",
              ["options"]: ["one", "two", "three"]
            }, {
              ["input"]: "i1",
              ["desc"]: "input description."
            }, {
              ["input"]: "i2",
              ["tags"]: ["one"]
            }], {
              'name': "local",
              'parent': dataset
            });
            expected(out).toBe("LocalDataset").toHave({
              'name': "local"
            });
            expected(out.data).toHaveLen(7);
            expected(out.data.v).toBe("VarDatum").toHave({
              'value': 123,
              'desc': "A description."
            });
            expected(out.data.c).toBe("ConstDatum").toHave({
              'value': "123 321"
            });
            expected(out.data.f).toBe("DatumFn").member("value").toBeFn();
            expected(out.data.d).toBe("VarDatum").toHave({
              'value': "this is the default"
            });
            expected(out.data.e).toBe("VarDatum").toHave({
              'value': "one"
            });
            expected(out.data.i1).toBe("ConstDatum").toHave({
              'value': "input #1",
              'tags': ["input", "const"]
            });
            expected(out.data.i2).toBe("ConstDatum").toHave({
              'value': "input #2",
              'tags': ["one", "input", "const"]
            });
          }
        });
        test("when local declaration collides with inherited data, the datum is set in local", () => {
          {
            const out = parser.parse([{
              ["var"]: "inherited",
              ["value"]: "zyx"
            }], {
              'name': "local",
              'parent': globalDs
            });
            expected(out.data.inherited).toBe(VarDatum).notSameAs(inheritedDatum);
            expected(out.parent.data.inherited).sameAs(inheritedDatum);
          }
        });
        test("when declaration constains invalid item, an error must be raised", () => {
          {
            const out = _core.dogma.peval(() => {
              return parser.parse([{
                ["value"]: 123
              }], {
                'name': "local",
                'parent': globalDs
              });
            });
            expected(out).it(0).equalTo(false).it(1).toBe(TypeError).like("Datum declaration must be 'const', 'fn', 'input' or 'var'. Got:");
          }
        });
        test("when input unset, error must be raised", () => {
          {
            const decl = [{
              ["input"]: "i"
            }];
            const out = _core.dogma.peval(() => {
              return parser.parse(decl, {
                'name': "local",
                'parent': globalDs
              });
            });
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("Error on datum 'i': A value is required."));
          }
        });
      }
    });
  }
});