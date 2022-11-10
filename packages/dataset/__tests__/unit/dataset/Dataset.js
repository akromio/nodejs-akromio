"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  Dataset,
  VarDatum,
  ConstDatum,
  DatumError
} = _core.dogma.use(require("../../.."));
const $TestDataset = class TestDataset extends Dataset {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_3e584a91bfe096f265f8c1743f2ed265___init__ instanceof Function) this._pvt_3e584a91bfe096f265f8c1743f2ed265___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3e584a91bfe096f265f8c1743f2ed265___post__ instanceof Function) this._pvt_3e584a91bfe096f265f8c1743f2ed265___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_3e584a91bfe096f265f8c1743f2ed265___validate__ instanceof Function) this._pvt_3e584a91bfe096f265f8c1743f2ed265___validate__(); /* c8 ignore stop */
  }
};

const TestDataset = new Proxy($TestDataset, {
  apply(receiver, self, args) {
    return new $TestDataset(...args);
  }
});
suite(__filename, () => {
  {
    suite("get datum", () => {
      {
        const v = VarDatum({
          'name': "v",
          'value': 123,
          'tags': ["var"]
        });
        const c = ConstDatum({
          'name': "c",
          'value': 321
        });
        const ds = TestDataset({
          'name': "test"
        }).setDatum(c).setDatum(v);
        suite("getData()", () => {
          {
            test("when no tag passed, all the data must be returned", () => {
              {
                const out = ds.getData();
                expected(out).similarTo([v, c]);
              }
            });
            test("when a tag passed, the data with that tag must be returned", () => {
              {
                const out = ds.getData({
                  'tag': "var"
                });
                expected(out).equalTo([v]);
              }
            });
          }
        });
        suite("getDatum()", () => {
          {
            test("when datum exists, this must be returned", () => {
              {
                const out = ds.getDatum("c");
                expected(out).toBe(ConstDatum).sameAs(c);
              }
            });
            test("when datum unexists, nil must be returned", () => {
              {
                const out = ds.getDatum("unknown");
                expected(out).toBeNil();
              }
            });
          }
        });
        suite("getDatumValue()", () => {
          {
            test("when datum exists, its value must be returned", () => {
              {
                const out = ds.getDatumValue("c");
                expected(out).notToBe(ConstDatum).equalTo(321);
              }
            });
            test("when datum unexists, nil must be returned", () => {
              {
                const out = ds.getDatumValue("unknown");
                expected(out).toBeNil();
              }
            });
          }
        });
      }
    });
    suite("set datum", () => {
      {
        let c;
        let v;
        let ds;
        setup(() => {
          {
            v = VarDatum({
              'name': "v",
              'value': 123
            });
            c = ConstDatum({
              'name': "c",
              'value': 321
            });
            ds = TestDataset({
              'name': "test"
            }).setDatum(c).setDatum(v);
          }
        });
        suite("setDatum()", () => {
          {
            test("when a datum with the same name already exists, this must be replaced", () => {
              {
                const datum = VarDatum({
                  'name': "v",
                  'value': "ole!"
                });
                const out = ds.setDatum(datum);
                expected(out).sameAs(ds);
                expected(out.data.v).sameAs(datum);
              }
            });
            test("when a datum with the same name already exists and const tag, error must be raised", () => {
              {
                const datum = VarDatum({
                  'name': "c",
                  'value': "ole!"
                });
                const out = _core.dogma.peval(() => {
                  return ds.setDatum(datum);
                });
                expected(out).it(0).equalTo(false).it(1).toBe(DatumError).like("Datum c is not updatable.");
              }
            });
            test("when datum unexists, this must be appended", () => {
              {
                const datum = VarDatum({
                  'name': "z",
                  'value': "ole!"
                });
                const out = ds.setDatum(datum);
                expected(out).sameAs(ds);
                expected(out.data.c).sameAs(c);
                expected(out.data.v).sameAs(v);
                expected(out.data.z).sameAs(datum);
              }
            });
          }
        });
        suite("setDatumValue()", () => {
          {
            test("when datum with the same name already exists, its value must be replaced", () => {
              {
                const out = ds.setDatumValue("v", "simple minds");
                expected(out).sameAs(ds);
                expected(out.data).toHaveLen(2);
                expected(out.data.v).sameAs(v).member("value").equalTo("simple minds");
              }
            });
            test("when datum unexists, a var datum must be created", () => {
              {
                const out = ds.setDatumValue("z", "alive and kicking");
                expected(out).sameAs(ds);
                expected(out.data).toHaveLen(3);
                expected(out.data.z).toBe(VarDatum).toHave({
                  'value': "alive and kicking"
                });
              }
            });
          }
        });
      }
    });
    suite("removeDatum()", () => {
      {
        let c;
        let v;
        let ds;
        setup(() => {
          {
            v = VarDatum({
              'name': "v",
              'value': 123,
              'tags': ["removable"]
            });
            c = ConstDatum({
              'name': "c",
              'value': 321
            });
            ds = TestDataset({
              'name': "test"
            }).setDatum(c).setDatum(v);
          }
        });
        test("when datum exists, this must be removed", () => {
          {
            const out = ds.removeDatum("v");
            expected(out).sameAs(ds);
            expected(out.data).toHaveLen(1);
            expected(out.data.c).sameAs(c);
          }
        });
        test("when datum exists w/o remoable tag, error must be raised", () => {
          {
            const out = _core.dogma.peval(() => {
              return ds.removeDatum("c");
            });
            expected(out).it(0).equalTo(false).it(1).toBe(DatumError).like("Datum c is not removable.");
          }
        });
        test("when datum unexists, nothing must be updated", () => {
          {
            const out = ds.removeDatum("unknown");
            expected(out).sameAs(ds);
            expected(out.data).toHaveLen(2);
          }
        });
      }
    });
  }
});