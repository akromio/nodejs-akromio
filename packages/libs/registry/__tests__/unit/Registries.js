"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const os = _core.dogma.use(require("os"));
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  simulator,
  method,
  field
} = _core.dogma.use(require("@akromio/doubles"));
const {
  Registries,
  Registry,
  RegistryState,
  FsConnector,
  Item
} = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    function createRegistry(name = "test") {
      /* c8 ignore next */if (name != null) _core.dogma.expect("name", name, _core.text);
      {
        return Registry({
          'name': name,
          'client': FsConnector({
            'basePath': path.join(__dirname, "../data/connector/fs")
          })
        });
      }
    }
    function createEmptyRegistry() {
      {
        return Registry({
          'name': "empty",
          'client': FsConnector({
            'basePath': __dirname
          })
        });
      }
    }
    teardown(() => {
      {
        monitor.clearAll();
      }
    });
    suite("connect()", () => {
      {
        test("when currently disconnected, connect() must be called", async () => {
          {
            const reg1 = monitor(createRegistry("one"), {
              'methods': ["connect"]
            });
            const reg2 = monitor(createRegistry("two"), {
              'methods': ["connect"]
            });
            const regs = Registries().appendRegistry(reg1).appendRegistry(reg2);
            const out = (0, await regs.connect());
            expected(out).sameAs(regs).toHave({
              'state': RegistryState.connected
            });
            for (const reg of [reg1, reg2]) {
              expected(monitor.log(reg).calls).equalTo(1);
            }
          }
        });
        test("when currently connected, no connect() must be performed", async () => {
          {
            const reg = monitor(createRegistry(), {
              'methods': ["connect"]
            });
            const regs = (0, await Registries().appendRegistry(reg).connect());
            const out = (0, await regs.connect());
            expected(out).sameAs(regs);
            expected(monitor.log(reg).calls).equalTo(1);
          }
        });
      }
    });
    suite("disconnect()", () => {
      {
        test("when currently connected, disconnect() must be called", async () => {
          {
            const reg1 = monitor(createRegistry("one"), {
              'methods': ["disconnect"]
            });
            const reg2 = monitor(createRegistry("two"), {
              'methods': ["disconnect"]
            });
            const regs = (0, await Registries().appendRegistry(reg1).appendRegistry(reg2).connect());
            const out = (0, await regs.disconnect());
            expected(out).sameAs(regs);
            for (const reg of [reg1, reg2]) {
              expected(monitor.log(reg).calls).equalTo(1);
            }
          }
        });
        test("when currently disconnected, no disconnect() must be performed", async () => {
          {
            const reg = monitor(createRegistry(), {
              'methods': ["disconnect"]
            });
            const regs = Registries().appendRegistry(reg);
            const out = (0, await regs.disconnect());
            expected(out).sameAs(regs);
            expected(monitor.log(reg).calls).equalTo(0);
          }
        });
      }
    });
    suite("appendRegistry()", () => {
      {
        test("when disconnected, the registry must be added", () => {
          {
            const reg = createRegistry();
            const regs = Registries();
            const out = regs.appendRegistry(reg);
            expected(out).sameAs(regs).toHaveLen(1);
          }
        });
        test("when connected, error must be raised", async () => {
          {
            const reg = createRegistry();
            const regs = (0, await Registries().connect());
            const out = _core.dogma.peval(() => {
              return regs.appendRegistry(reg);
            });
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("New registries can only be appended when disconnected."));
          }
        });
      }
    });
    suite("getRegistry()", () => {
      {
        test("when existing, registry must be returned", () => {
          {
            const reg = createRegistry();
            const regs = Registries().appendRegistry(reg);
            const out = regs.getRegistry("test");
            expected(out).sameAs(reg);
          }
        });
        test("when not existing, nil must be returned", () => {
          {
            const regs = Registries();
            const out = regs.getRegistry("one");
            expected(out).toBeNil();
          }
        });
      }
    });
    suite("registryNames", () => {
      {
        test("a list must be returned with the registry names", () => {
          {
            const reg1 = createEmptyRegistry();
            const reg2 = createRegistry();
            const regs = Registries().appendRegistry(reg1).appendRegistry(reg2);
            const out = regs.registryNames;
            expected(out).equalTo(["empty", "test"]);
          }
        });
      }
    });
    suite("getItem()", () => {
      {
        test("when not connected, error must be raised", async () => {
          {
            const reg = createRegistry();
            const regs = Registries().appendRegistry(reg);
            const out = await _core.dogma.pawait(() => regs.getItem("jobs.yaml"));
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("The registries must be connected for performing the op."));
          }
        });
        suite("when registryName not passed, getItemFromRegistries() used", () => {
          {
            test("when not existing, nil must be returned", async () => {
              {
                const regs = (0, await Registries().connect());
                const out = (0, await regs.getItem("/catalogs/jobs.yaml"));
                expected(out).toBeNil();
              }
            });
            test("when existing in the 1st registry, item must be returned", async () => {
              {
                const reg = createRegistry();
                const regs = (0, await Registries().appendRegistry(reg).connect());
                const itemPath = "/catalogs/jobs.yaml";
                const out = (0, await regs.getItem(itemPath));
                expected(out).toBe(Item).toHave({
                  'registryName': "test",
                  'cty': "text/yaml",
                  'value': `spec: v1.0${os.EOL}cty: yaml`
                });
                expected.path(out.name).equalTo(itemPath);
              }
            });
            test("when existing in the 2nd registry, item must be returned", async () => {
              {
                const reg1 = createEmptyRegistry();
                const reg2 = createRegistry();
                const regs = (0, await Registries().appendRegistry(reg1).appendRegistry(reg2).connect());
                const itemPath = "/catalogs/jobs.yaml";
                const out = (0, await regs.getItem(itemPath));
                expected(out).toBe(Item).toHave({
                  'registryName': "test",
                  'cty': "text/yaml",
                  'value': `spec: v1.0${os.EOL}cty: yaml`
                });
                expected.path(out.name).equalTo(itemPath);
              }
            });
          }
        });
        suite("when registryName passed, getItemFromRegistry() used", () => {
          {
            const registryName = "test";
            test("when registry not found, nil must be returned", async () => {
              {
                const regs = (0, await Registries().connect());
                const out = (0, await regs.getItem("/catalogs/jobs.yaml", {
                  'registryName': registryName
                }));
                expected(out).toBeNil();
              }
            });
            test("when existing, item must be returned", async () => {
              {
                const reg = createRegistry();
                const regs = (0, await Registries().appendRegistry(reg).connect());
                const itemPath = "/catalogs/jobs.yaml";
                const out = (0, await regs.getItem(itemPath, {
                  'registryName': registryName
                }));
                expected(out).toBe(Item).toHave({
                  'registryName': "test",
                  'cty': "text/yaml",
                  'value': `spec: v1.0${os.EOL}cty: yaml`
                });
                expected.path(out.name).equalTo(itemPath);
              }
            });
            test("when not existing, item must be returned", async () => {
              {
                const reg = createRegistry();
                const regs = (0, await Registries().appendRegistry(reg).connect());
                const out = (0, await regs.getItem("/unknown.yaml", {
                  'registryName': registryName
                }));
                expected(out).toBeNil();
              }
            });
          }
        });
      }
    });
    suite("downloadItem()", () => {
      {
        suite("when registryName passed, downloadItemFromRegistry() used", () => {
          {
            const registryName = "test";
            const localPath = path.join(os.tmpdir(), ".apm/jobs/catalogs");
            test("when registry not found, false must be returned", async () => {
              {
                const registries = monitor((0, await Registries().connect()), {
                  'methods': ["downloadItemFromRegistry"]
                });
                const itemPath = "/jobs/catalogs/jobs.yaml";
                const opts = {
                  ["registryName"]: registryName
                };
                const out = (0, await registries.downloadItem(itemPath, localPath, opts));
                expected(out).equalTo(false);
                const log = monitor.log(registries);
                expected(log.calls).equalTo(1);
                expected(log.calledWith([itemPath, localPath, registryName, opts])).equalTo(1);
              }
            });
            test("when registry found, homonym method must be called", async () => {
              {
                const registry = monitor(simulator(Registry, {
                  'name': field({
                    'returns': registryName
                  }),
                  'connect': method(),
                  'downloadItem': method.resolves(true)
                }), {
                  'methods': ["downloadItem"]
                });
                const registries = (0, await Registries().appendRegistry(registry).connect());
                const itemPath = "/jobs/catalogs/jobs.yaml";
                const opts = {
                  ["registryName"]: registryName
                };
                const out = (0, await registries.downloadItem(itemPath, localPath, opts));
                expected(out).equalTo(true);
                const log = monitor.log(registry);
                expected(log.calls).equalTo(1);
                expected(log.calledWith([itemPath, localPath, opts])).equalTo(1);
              }
            });
          }
        });
        suite("when registryName not passed, downloadItemFromRegistries() used", () => {
          {
            const localPath = path.join(os.tmpdir(), ".apm/jobs/catalogs");
            test("when item not found, false must be returned", async () => {
              {
                const registry = monitor(simulator(Registry, {
                  'connect': method(),
                  'downloadItem': method.resolves(false)
                }), {
                  'methods': ["downloadItem"]
                });
                const registries = monitor((0, await Registries().appendRegistry(registry).connect()), {
                  'methods': ["downloadItemFromRegistries"]
                });
                const itemPath = "/jobs/catalogs/jobs.yaml";
                const out = (0, await registries.downloadItem(itemPath, localPath));
                expected(out).equalTo(false);
                let log = monitor.log(registries);
                expected(log.calls).equalTo(1);
                expected(log.calledWith([itemPath, localPath, undefined])).equalTo(1);
                log = monitor.log(registry);
                expected(log.calls).equalTo(1);
                expected(log.calledWith([itemPath, localPath, undefined])).equalTo(1);
              }
            });
            test("when item downloaded, true must be returned", async () => {
              {
                const registry = monitor(simulator(Registry, {
                  'connect': method(),
                  'downloadItem': method.resolves(true)
                }), {
                  'methods': ["downloadItem"]
                });
                const registries = monitor((0, await Registries().appendRegistry(registry).connect()), {
                  'methods': ["downloadItemFromRegistries"]
                });
                const itemPath = "/jobs/catalogs/jobs.yaml";
                const out = (0, await registries.downloadItem(itemPath, localPath));
                expected(out).equalTo(true);
                let log = monitor.log(registries);
                expected(log.calls).equalTo(1);
                expected(log.calledWith([itemPath, localPath, undefined])).equalTo(1);
                log = monitor.log(registry);
                expected(log.calls).equalTo(1);
                expected(log.calledWith([itemPath, localPath, undefined])).equalTo(1);
              }
            });
          }
        });
      }
    });
  }
});