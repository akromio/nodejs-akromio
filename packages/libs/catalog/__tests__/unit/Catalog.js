"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  Plugins
} = _core.dogma.use(require("@akromio/core"));
const {
  Catalog: CatalogBase
} = _core.dogma.use(require("../.."));
const $Catalog = class Catalog extends CatalogBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_8e51cc69349c60409be6298d0ed22cbe___init__ instanceof Function) this._pvt_8e51cc69349c60409be6298d0ed22cbe___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8e51cc69349c60409be6298d0ed22cbe___post__ instanceof Function) this._pvt_8e51cc69349c60409be6298d0ed22cbe___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8e51cc69349c60409be6298d0ed22cbe___validate__ instanceof Function) this._pvt_8e51cc69349c60409be6298d0ed22cbe___validate__(); /* c8 ignore stop */
  }
};

const Catalog = new Proxy($Catalog, {
  apply(receiver, self, args) {
    return new $Catalog(...args);
  }
});
suite(__filename, () => {
  {
    const globalDataset = GlobalDataset({
      'name': "global"
    });
    suite("constructor", () => {
      {
        test("when called, initialization must be performed", () => {
          {
            const plugins = Plugins();
            const out = Catalog({
              'spec': "v1.0",
              'loc': "file:///my/catalog.yaml",
              'cty': "text/yaml",
              'desc': "A test catalog.",
              'dataset': globalDataset,
              'plugins': plugins
            });
            expected(out).toHave({
              'spec': "v1.0",
              'loc': "file:///my/catalog.yaml",
              'cty': "text/yaml",
              'desc': "A test catalog.",
              'dataset': globalDataset,
              'plugins': plugins
            });
          }
        });
      }
    });
    suite("finalize()", () => {
      {
        teardown(() => {
          {
            monitor.clearAll();
          }
        });
        test("when called, plugins.finalize() must be called", async () => {
          {
            const plugins = monitor(Plugins(), {
              'methods': ["finalize"]
            });
            const catalog = Catalog({
              'spec': "v1.0",
              'loc': "file:///my/catalog.yaml",
              'cty': "text/yaml",
              'desc': "A test catalog.",
              'dataset': globalDataset,
              'plugins': plugins
            });
            const out = (0, await catalog.finalize());
            expected(monitor.log(plugins).calls).equalTo(1);
          }
        });
      }
    });
  }
});