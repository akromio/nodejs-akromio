"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const CatalogParserBase = _core.dogma.use(require("./CatalogParser"));
const CatalogBase = _core.dogma.use(require("./Catalog"));
const $Catalog = class Catalog extends CatalogBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_8f63cef61422cd6539f9028222592756___init__ instanceof Function) this._pvt_8f63cef61422cd6539f9028222592756___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8f63cef61422cd6539f9028222592756___post__ instanceof Function) this._pvt_8f63cef61422cd6539f9028222592756___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8f63cef61422cd6539f9028222592756___validate__ instanceof Function) this._pvt_8f63cef61422cd6539f9028222592756___validate__(); /* c8 ignore stop */
  }
};

const Catalog = new Proxy($Catalog, {
  apply(receiver, self, args) {
    return new $Catalog(...args);
  }
});
const $CatalogParser = class CatalogParser extends CatalogParserBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_8f63cef61422cd6539f9028222592756___init__ instanceof Function) this._pvt_8f63cef61422cd6539f9028222592756___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8f63cef61422cd6539f9028222592756___post__ instanceof Function) this._pvt_8f63cef61422cd6539f9028222592756___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8f63cef61422cd6539f9028222592756___validate__ instanceof Function) this._pvt_8f63cef61422cd6539f9028222592756___validate__(); /* c8 ignore stop */
  }
};

const CatalogParser = new Proxy($CatalogParser, {
  apply(receiver, self, args) {
    return new $CatalogParser(...args);
  }
});
CatalogParser.prototype.createCatalog = function (decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map);
  {
    return Catalog(decl);
  }
};
suite(__filename, () => {
  {
    const parentDataset = GlobalDataset({
      'name': "global"
    });
    const parser = CatalogParser();
    suite("parseCommon()", () => {
      {
        test("when spec != v1.0, error must be raised", async () => {
          {
            const decl = {
              ["spec"]: "1.0",
              ["loc"]: "test:///stages/catalogs/test-catalog",
              ["cty"]: "text/yaml"
            };
            const out = await _core.dogma.pawait(() => parser.parse(decl, {
              'parentDataset': parentDataset
            }));
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("spec must be v1.0. Got: 1.0."));
          }
        });
        test("when dataset is unset, empty dataset must be used", async () => {
          {
            const decl = {
              ["spec"]: "v1.0",
              ["loc"]: "test:///stages/catalogs/test-catalog",
              ["cty"]: "text/yaml"
            };
            const out = (0, await parser.parse(decl, {
              'parentDataset': parentDataset
            }));
            expected(out).toBe(Catalog).toHave({
              'spec': "v1.0",
              'loc': "test:///stages/catalogs/test-catalog",
              'cty': "text/yaml"
            });
          }
        });
        test("when declaration is ok, catalog must be returned", async () => {
          {
            const decl = {
              ["spec"]: "v1.0",
              ["dataset"]: [],
              ["loc"]: "test:///stages/catalogs/test-catalog",
              ["cty"]: "text/yaml"
            };
            const out = (0, await parser.parse(decl, {
              'parentDataset': parentDataset
            }));
            expected(out).toBe(Catalog);
          }
        });
      }
    });
  }
});