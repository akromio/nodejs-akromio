"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const VarDatum = _core.dogma.use(require("../datum/VarDatum"));
const GlobalDataset = _core.dogma.use(require("./GlobalDataset"));
const LocalDataset = _core.dogma.use(require("./LocalDataset"));
suite(__filename, () => {
  {
    suite("reprMap", () => {
      {
        test("when called, super and own data must be returned", () => {
          {
            const g = VarDatum({
              'name': "g",
              'value': 123
            });
            const globalDs = GlobalDataset({
              'name': "global"
            }).setDatum(g);
            const l = VarDatum({
              'name': "l",
              'value': 321
            });
            const ds = LocalDataset({
              'name': "local",
              'parent': globalDs
            }).setDatum(l);
            const out = ds.reprMap;
            expected(out).equalTo({
              'g': 123,
              'l': 321
            });
          }
        });
      }
    });
    suite("getDatum()", () => {
      {
        let g;
        let l;
        let globalDs;
        let ds;
        setup(() => {
          {
            g = VarDatum({
              'name': "g",
              'value': 123
            });
            globalDs = GlobalDataset({
              'name': "global"
            }).setDatum(g);
            l = VarDatum({
              'name': "l",
              'value': 321
            });
            ds = LocalDataset({
              'name': "local",
              'parent': globalDs
            }).setDatum(l);
          }
        });
        test("when datum exists in local, this must be returned", () => {
          {
            const out = ds.getDatum("l");
            expected(out).toBe(VarDatum).toHave({
              'value': 321
            });
          }
        });
        test("when datum exists in parent, this must be returned", () => {
          {
            const out = ds.getDatum("g");
            expected(out).toBe(VarDatum).toHave({
              'value': 123
            });
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
    suite("setDatumValue()", () => {
      {
        let g;
        let l;
        let globalDs;
        let ds;
        setup(() => {
          {
            g = VarDatum({
              'name': "g",
              'value': 123
            });
            globalDs = GlobalDataset({
              'name': "global"
            }).setDatum(g);
            l = VarDatum({
              'name': "l",
              'value': 321
            });
            ds = LocalDataset({
              'name': "local",
              'parent': globalDs
            }).setDatum(l);
          }
        });
        test("when datum exists in local, this must be replaced", () => {
          {
            const out = ds.setDatumValue("l", 123456);
            expected(out).sameAs(ds);
            expected(ds.parent.data).toHaveLen(1);
            expected(ds.parent.data.g).sameAs(g);
            expected(ds.data).toHaveLen(1);
            expected(ds.data.l).sameAs(l).member("value").equalTo(123456);
          }
        });
        test("when datum exists in parent, this must be replaced", () => {
          {
            const out = ds.setDatumValue("g", 123456);
            expected(out).sameAs(ds);
            expected(ds.parent.data).toHaveLen(1);
            expected(ds.parent.data.g).sameAs(g).member("value").equalTo(123456);
            expected(ds.data).toHaveLen(1);
            expected(ds.data.l).sameAs(l);
          }
        });
        test("when datum unexists, this must be created in local", () => {
          {
            const out = ds.setDatumValue("datum", 123456);
            expected(out).sameAs(ds);
            expected(ds.parent.data).toHaveLen(1);
            expected(ds.parent.data.g).sameAs(g);
            expected(ds.data).toHaveLen(2);
            expected(ds.data.l).sameAs(l);
            expected(ds.data.datum).toBe(VarDatum).member("value").equalTo(123456);
          }
        });
      }
    });
  }
});