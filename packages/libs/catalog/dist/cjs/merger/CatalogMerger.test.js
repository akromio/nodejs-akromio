"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const CatalogMergerBase = _core.dogma.use(require("./CatalogMerger"));
const $CatalogMerger = class CatalogMerger extends CatalogMergerBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_a26d739cdeeb81b2db239d83a810c87e___init__ instanceof Function) this._pvt_a26d739cdeeb81b2db239d83a810c87e___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_a26d739cdeeb81b2db239d83a810c87e___post__ instanceof Function) this._pvt_a26d739cdeeb81b2db239d83a810c87e___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_a26d739cdeeb81b2db239d83a810c87e___validate__ instanceof Function) this._pvt_a26d739cdeeb81b2db239d83a810c87e___validate__(); /* c8 ignore stop */
  }
};

const CatalogMerger = new Proxy($CatalogMerger, {
  apply(receiver, self, args) {
    return new $CatalogMerger(...args);
  }
});
suite(__filename, () => {
  {
    const merger = CatalogMerger();
    suite("merge()", () => {
      {
        test("when other, this is overwritten", () => {
          {
            const extensor = {
              ["desc"]: "extensor"
            };
            const extended1 = {
              ["desc"]: "extended1"
            };
            const extended2 = {
              ["desc"]: "extended2"
            };
            const out = merger.merge(extensor, extended1, extended2);
            expected(out).toHave({
              'desc': "extensor"
            });
          }
        });
      }
    });
    suite("mergeDataset()", () => {
      {
        test("when available dataset, this is removed and the replacer is appended in the end", () => {
          {
            const extensor = {
              ["dataset"]: [{
                ["const"]: "y",
                ["desc"]: "extensor"
              }, {
                ["var"]: "a",
                ["desc"]: "extensor"
              }]
            };
            const extended1 = {
              ["dataset"]: [{
                ["var"]: "x",
                ["desc"]: "extended1"
              }, {
                ["var"]: "y",
                ["desc"]: "extended1"
              }]
            };
            const extended2 = {
              ["dataset"]: [{
                ["var"]: "y",
                ["desc"]: "extended2"
              }, {
                ["var"]: "z",
                ["desc"]: "extended2"
              }, {
                ["fn"]: "f",
                ["desc"]: "extended2"
              }]
            };
            const out = merger.merge(extensor, extended1, extended2);
            expected(out.dataset).equalTo([{
              ["var"]: "x",
              ["desc"]: "extended1"
            }, {
              ["var"]: "z",
              ["desc"]: "extended2"
            }, {
              ["fn"]: "f",
              ["desc"]: "extended2"
            }, {
              ["const"]: "y",
              ["desc"]: "extensor"
            }, {
              ["var"]: "a",
              ["desc"]: "extensor"
            }]);
          }
        });
        test("when dataset unavailable, empty list must be used", () => {
          {
            const extended1 = {};
            const extended2 = {
              ["dataset"]: [{
                ["var"]: "y",
                ["desc"]: "extended2"
              }, {
                ["var"]: "z",
                ["desc"]: "extended2"
              }]
            };
            const extensor = {};
            const out = merger.merge(extensor, extended1, extended2);
            expected(out.dataset).equalTo([{
              ["var"]: "y",
              ["desc"]: "extended2"
            }, {
              ["var"]: "z",
              ["desc"]: "extended2"
            }]);
          }
        });
      }
    });
  }
});