"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const CatalogItemParseOpts = _core.dogma.use(require("./CatalogItemParseOpts"));
const CatalogItemParserBase = _core.dogma.use(require("./CatalogItemParser"));
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
  const self = this;
  let item; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, CatalogItemParseOpts);
  {
    if (decl.macro) {
      item = _core.dogma.clone(decl, {
        "name": decl.macro
      }, {}, [], []);
    } else {
      item = _core.dogma.clone(decl, {
        "name": decl.group
      }, {}, [], []);
    }
  }
  return item;
};
suite(__filename, () => {
  {
    const parser = CatalogItemParser();
    const parseOpts = {};
    suite("parse()", () => {
      {
        test("when called, a map with the item instances must be returned", () => {
          {
            const macro = {
              ["macro"]: "test",
              ["steps"]: []
            };
            const out = parser.parse([macro], parseOpts);
            expected(out).equalTo({
              'test': _core.dogma.clone(macro, {
                "name": macro.macro
              }, {}, [], [])
            });
          }
        });
      }
    });
    suite("parseGroup()", () => {
      {
        test("when group, the items must have the group name as tag", () => {
          {
            const macro = {
              ["macro"]: "test",
              ["tags"]: [],
              ["steps"]: []
            };
            const group = {
              ["group"]: "grp",
              ["jobs"]: [macro]
            };
            const out = parser.parse([group], parseOpts);
            expected(out).equalTo({
              'test': _core.dogma.clone(macro, {
                "name": macro.macro,
                "tags": ["grp"]
              }, {}, [], [])
            });
          }
        });
      }
    });
  }
});