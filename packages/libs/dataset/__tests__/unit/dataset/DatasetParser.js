"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  DatasetParser,
  GlobalDataset,
  VarDatum,
  ConstDatum
} = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const inheritedDatum = ConstDatum({
      'name': "inherited",
      'value': "xyz"
    });
    const ds = GlobalDataset({
      'name': "global"
    }).setDatum(inheritedDatum);
    const parser = DatasetParser();
    suite("parse()", () => {
      {
        test("when declaration contains valid declarations, a dataset must be returned with these", () => {
          {
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
            }], {
              'name': "local",
              'parent': ds
            });
            expected(out).toBe("LocalDataset").toHave({
              'name': "local"
            });
            expected(out.data).toHaveLen(5);
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
          }
        });
        test("when local declaration collides with inherited data, the datum is set in local", () => {
          {
            const out = parser.parse([{
              ["var"]: "inherited",
              ["value"]: "zyx"
            }], {
              'name': "local",
              'parent': ds
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
                'parent': ds
              });
            });
            expected(out).it(0).equalTo(false).it(1).toBe(TypeError).like("Item of dataset declaration must contain var, const or fn.");
          }
        });
      }
    });
  }
});