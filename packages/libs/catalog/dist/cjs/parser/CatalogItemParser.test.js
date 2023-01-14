"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const CatalogItemBase = _core.dogma.use(require("./CatalogItem"));
const CatalogItemParseOpts = _core.dogma.use(require("./CatalogItemParseOpts"));
const CatalogItemParserBase = _core.dogma.use(require("./CatalogItemParser"));
const $CatalogItem = class CatalogItem extends CatalogItemBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'dataset', {
      value: (0, _core.coalesce)(_['dataset'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_8ab00b20cff63ad569160857bdbc3f35___init__ instanceof Function) this._pvt_8ab00b20cff63ad569160857bdbc3f35___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8ab00b20cff63ad569160857bdbc3f35___post__ instanceof Function) this._pvt_8ab00b20cff63ad569160857bdbc3f35___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8ab00b20cff63ad569160857bdbc3f35___validate__ instanceof Function) this._pvt_8ab00b20cff63ad569160857bdbc3f35___validate__(); /* c8 ignore stop */
  }
};

const CatalogItem = new Proxy($CatalogItem, {
  apply(receiver, self, args) {
    return new $CatalogItem(...args);
  }
});
const $CatalogItemParser = class CatalogItemParser extends CatalogItemParserBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'itemName', {
      value: (0, _core.coalesce)(_['itemName'], "job"),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_8ab00b20cff63ad569160857bdbc3f35___init__ instanceof Function) this._pvt_8ab00b20cff63ad569160857bdbc3f35___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8ab00b20cff63ad569160857bdbc3f35___post__ instanceof Function) this._pvt_8ab00b20cff63ad569160857bdbc3f35___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8ab00b20cff63ad569160857bdbc3f35___validate__ instanceof Function) this._pvt_8ab00b20cff63ad569160857bdbc3f35___validate__(); /* c8 ignore stop */
  }
};

const CatalogItemParser = new Proxy($CatalogItemParser, {
  apply(receiver, self, args) {
    return new $CatalogItemParser(...args);
  }
});
CatalogItemParser.prototype.parseItem = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, CatalogItemParseOpts);
  {
    return CatalogItem(_core.dogma.clone(decl, {
      "name": decl.macro
    }, {}, [], []));
  }
};
suite(__filename, () => {
  {
    const parser = CatalogItemParser();
    const parseOpts = {};
    suite("parse()", () => {
      {
        test("when called, a map with the item instances must be returned", () => {
          {
            const decl = {
              ["macro"]: "test",
              ["steps"]: []
            };
            const out = parser.parse(decl, parseOpts);
            expected(out.test).toBe(CatalogItem).toHave({
              'name': "test",
              'tags': []
            });
          }
        });
      }
    });
    suite("parseGroup()", () => {
      {
        test("when group w/o dataset, its items must have the group name as tag", () => {
          {
            const macro = {
              ["macro"]: "test",
              ["tags"]: [],
              ["steps"]: []
            };
            const decl = {
              ["group"]: "grp",
              ["jobs"]: [macro]
            };
            const out = parser.parse(decl, parseOpts);
            expected(out.test).toBe(CatalogItem).toHave({
              'name': "test",
              'tags': ["grp"]
            });
          }
        });
        test("group w/ dataset, its items must have the group name as tag and the dataset", () => {
          {
            const macro1 = {
              ["macro"]: "macro1",
              ["tags"]: [],
              ["steps"]: []
            };
            const macro2 = {
              ["macro"]: "macro2",
              ["dataset"]: ["job"],
              ["tags"]: [],
              ["steps"]: []
            };
            const decl = {
              ["group"]: "grp",
              ["dataset"]: ["group"],
              ["jobs"]: [macro1, macro2]
            };
            const out = parser.parse(decl, parseOpts);
            expected(out.macro1).toBe(CatalogItem).toHave({
              'name': "macro1",
              'tags': ["grp"],
              'dataset': ["group"]
            });
            expected(out.macro2).toBe(CatalogItem).toHave({
              'name': "macro2",
              'tags': ["grp"],
              'dataset': ["group", "job"]
            });
          }
        });
      }
    });
  }
});