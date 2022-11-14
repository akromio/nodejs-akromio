"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  simulator,
  interceptor,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const {
  Registries,
  Item
} = _core.dogma.use(require("@akromio/registry"));
const {
  CatalogReader: CatalogReaderBase
} = _core.dogma.use(require("../.."));
const $CatalogReader = class CatalogReader extends CatalogReaderBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('merger', _['merger'], null);
    Object.defineProperty(this, 'merger', {
      value: (0, _core.coalesce)(_['merger'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_1f65b8ed03dcb3cc55b73c6d80aa44e8___init__ instanceof Function) this._pvt_1f65b8ed03dcb3cc55b73c6d80aa44e8___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1f65b8ed03dcb3cc55b73c6d80aa44e8___post__ instanceof Function) this._pvt_1f65b8ed03dcb3cc55b73c6d80aa44e8___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_1f65b8ed03dcb3cc55b73c6d80aa44e8___validate__ instanceof Function) this._pvt_1f65b8ed03dcb3cc55b73c6d80aa44e8___validate__(); /* c8 ignore stop */
  }
};

const CatalogReader = new Proxy($CatalogReader, {
  apply(receiver, self, args) {
    return new $CatalogReader(...args);
  }
});
suite(__filename, () => {
  {
    suite("readCatalogDecl()", () => {
      {
        const merger = {};
        const reader = CatalogReader({
          'merger': merger
        });
        test("when catalog unexists, nil must be returned", async () => {
          {
            const regs = simulator(Registries, {
              'getItem': method.returns()
            });
            const out = (0, await reader.readCatalogDecl("unknown.yaml", regs));
            expected(out).toBeNil();
          }
        });
        test("when catalog with nonsupported cty, error must be raised", async () => {
          {
            const item = Item({
              'registryName': "test",
              'name': "jobs.txt",
              'cty': "text/plain",
              'value': Buffer.from("spec: v1.0\njobs: []")
            });
            const regs = simulator(Registries, {
              'getItem': method.returns(item)
            });
            const out = await _core.dogma.pawait(() => reader.readCatalogDecl("jobs.txt", regs));
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("Invalid content-type for catalog: text/plain."));
          }
        });
        test("when cty is yaml, parsed decl must be returned", async () => {
          {
            const item = Item({
              'registryName': "test",
              'name': "jobs.yaml",
              'cty': "text/yaml",
              'value': "spec: v1.0\njobs: []"
            });
            const regs = simulator(Registries, {
              'getItem': method.returns(item)
            });
            const out = (0, await reader.readCatalogDecl("jobs.yaml", regs));
            expected(out).toHave({
              'spec': "v1.0",
              'jobs': [],
              'registryName': "test",
              'name': "jobs.yaml",
              'loc': "test://jobs.yaml",
              'cty': "text/yaml"
            });
          }
        });
        test("when cty is json, parsed decl must be returned", async () => {
          {
            const item = Item({
              'registryName': "test",
              'name': "jobs.json",
              'cty': "application/json",
              'value': "{\n\"spec\": \"v1.0\",\n\"jobs\": []\n}"
            });
            const regs = simulator(Registries, {
              'getItem': method.returns(item)
            });
            const out = (0, await reader.readCatalogDecl("jobs.json", regs));
            expected(out).toHave({
              'spec': "v1.0",
              'jobs': [],
              'registryName': "test",
              'name': "jobs.json",
              'loc': "test://jobs.json",
              'cty': "application/json"
            });
          }
        });
        test("when decl is got as object, decl must be returned", async () => {
          {
            const item = Item({
              'registryName': "test",
              'name': "jobs.json",
              'cty': "application/json",
              'value': {
                ["spec"]: "v1.0",
                ["jobs"]: []
              }
            });
            const regs = simulator(Registries, {
              'getItem': method.returns(item)
            });
            const out = (0, await reader.readCatalogDecl("test://jobs.json", regs));
            expected(out).toHave({
              'spec': "v1.0",
              'jobs': [],
              'registryName': "test",
              'name': "jobs.json",
              'loc': "test://jobs.json",
              'cty': "application/json"
            });
          }
        });
        test("when search in several registries and found, decl must be returned", async () => {
          {
            const item = Item({
              'registryName': "test",
              'name': "jobs",
              'cty': "application/json",
              'value': {
                ["spec"]: "v1.0",
                ["jobs"]: []
              }
            });
            const regs = simulator(Registries, {
              'getItem': method([{
                ["args"]: ["jobs.yaml", {
                  ["registryName"]: undefined
                }],
                ["returns"]: null
              }, {
                ["args"]: ["jobs.yml", {
                  ["registryName"]: undefined
                }],
                ["returns"]: null
              }, {
                ["args"]: ["jobs.json", {
                  ["registryName"]: undefined
                }],
                ["returns"]: item
              }])
            });
            const out = (0, await reader.readCatalogDecl("jobs", regs));
            expected(out).toHave({
              'spec': "v1.0",
              'jobs': [],
              'registryName': "test",
              'name': "jobs",
              'loc': "test://jobs",
              'cty': "application/json"
            });
          }
        });
        test("when search in several registries and not found, nil must be returned", async () => {
          {
            const regs = simulator(Registries, {
              'getItem': method([{
                ["args"]: ["jobs.yaml", {
                  ["registryName"]: undefined
                }],
                ["returns"]: null
              }, {
                ["args"]: ["jobs.yml", {
                  ["registryName"]: undefined
                }],
                ["returns"]: null
              }, {
                ["args"]: ["jobs.json", {
                  ["registryName"]: undefined
                }],
                ["returns"]: null
              }])
            });
            const out = (0, await reader.readCatalogDecl("jobs", regs));
            expected(out).toBeNil();
          }
        });
      }
    });
    suite("extendCatalogDecl()", () => {
      {
        const merger = {};
        const reader = CatalogReader({
          'merger': merger
        });
        teardown(() => {
          {
            monitor.clearAll();
          }
        });
        test("when extends, readCatalogDecl() must call extendCatalogDecl()", async () => {
          {
            const rdr = monitor(interceptor(reader, {
              'extendCatalogDecl': method.invokes(decl => {
                /* c8 ignore next */_core.dogma.expect("decl", decl);
                {
                  return decl;
                }
              })
            }), {
              'methods': ["extendCatalogDecl"]
            });
            const item = Item({
              'registryName': "test",
              'name': "jobs.json",
              'cty': "text/json",
              'value': {
                ["spec"]: "v1.0",
                ["extends"]: ["base1", "base2"],
                ["jobs"]: []
              }
            });
            const regs = simulator(Registries, {
              'getItem': method.returns(item)
            });
            const out = (0, await rdr.readCatalogDecl("jobs.json", regs));
            expected(out).toHave({
              'spec': "v1.0",
              'extends': ["base1", "base2"],
              'jobs': [],
              'registryName': "test",
              'name': "jobs.json",
              'loc': "test://jobs.json",
              'cty': "text/json"
            });
            expected(monitor.log(rdr).calls).equalTo(1);
          }
        });
        test("when base existing, merge must be performed", async () => {
          {
            const merger = simulator({
              'merge': method.returns({
                'merged': true
              })
            });
            const reader = CatalogReader({
              'merger': merger
            });
            const jobsItem = Item({
              'registryName': "test",
              'name': "jobs.json",
              'cty': "text/json",
              'value': {
                ["spec"]: "v1.0",
                ["extends"]: ["extended1"],
                ["jobs"]: []
              }
            });
            const extended1Item = Item({
              'registryName': "test",
              'name': "extended1.json",
              'cty': "text/json",
              'value': {
                ["spec"]: "v1.0",
                ["jobs"]: []
              }
            });
            const getItem = method([{
              ["args"]: ["jobs.json", {
                ["registryName"]: undefined
              }],
              ["returns"]: jobsItem
            }, {
              ["args"]: ["extended1.json", {
                ["registryName"]: "test"
              }],
              ["returns"]: extended1Item
            }, {
              ["default"]: true,
              ["returns"]: null
            }]);
            const regs = simulator(Registries, {
              'getItem': getItem
            });
            const out = (0, await reader.readCatalogDecl("jobs", regs));
            expected(out).toHave({
              'merged': true
            });
          }
        });
        test("when base not existing, error must be raised", async () => {
          {
            const jobsItem = Item({
              'registryName': "test",
              'name': "jobs.json",
              'cty': "text/json",
              'value': {
                ["spec"]: "v1.0",
                ["extends"]: ["unknown"],
                ["jobs"]: []
              }
            });
            const getItem = method([{
              ["args"]: ["jobs.json", {
                ["registryName"]: undefined
              }],
              ["returns"]: jobsItem
            }, {
              ["default"]: true,
              ["returns"]: null
            }]);
            const regs = simulator(Registries, {
              'getItem': getItem
            });
            const out = await _core.dogma.pawait(() => reader.readCatalogDecl("jobs", regs));
            expected(out).it(0).equalTo(false).it(1).equalTo(Error("Catalog to extend not found: unknown."));
          }
        });
      }
    });
  }
});