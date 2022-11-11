"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const os = _core.dogma.use(require("os"));
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  interceptor,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const {
  Registry,
  FsConnector
} = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    const name = "test";
    const basePath = path.join(__dirname, "../data/connector/fs");
    function createConnector() {
      {
        return FsConnector({
          'basePath': basePath
        });
      }
    }
    suite("connect()", () => {
      {
        test("when called, client.connect() muest be called", async () => {
          {
            const client = monitor(createConnector(), {
              'methods': ["connect"]
            });
            const registry = Registry({
              'name': name,
              'client': client
            });
            const out = (0, await registry.connect());
            expected(out).sameAs(registry);
            const log = monitor.log(client);
            expected(log.calls).equalTo(1);
          }
        });
      }
    });
    suite("disconnect()", () => {
      {
        test("when called, client.connect() muest be called", async () => {
          {
            const client = monitor(createConnector(), {
              'methods': ["disconnect"]
            });
            const registry = (0, await Registry({
              'name': name,
              'client': client
            }).connect());
            const out = (0, await registry.disconnect());
            expected(out).sameAs(registry);
            const log = monitor.log(client);
            expected(log.calls).equalTo(1);
          }
        });
      }
    });
    suite("getItem()", () => {
      {
        test("when item exists, this must be returned", async () => {
          {
            const client = monitor(createConnector(), {
              'methods': ["getItem"]
            });
            const registry = (0, await Registry({
              'name': name,
              'client': client
            }).connect());
            const itemPath = "/catalogs/jobs.yaml";
            const out = (0, await registry.getItem(itemPath));
            expected(out).toHave({
              'registryName': name,
              'cty': "text/yaml",
              'value': `spec: v1.0${os.EOL}cty: yaml`
            });
            expected(out.uri).like("test://.catalogs.jobs.yaml");
            expected.path(out.name).equalTo(itemPath);
            const log = monitor.log(client);
            expected(log.calls).equalTo(1);
          }
        });
        test("when item unexists, nil must be returned", async () => {
          {
            const client = monitor(createConnector(), {
              'methods': ["getItem"]
            });
            const registry = (0, await Registry({
              'name': name,
              'client': client
            }).connect());
            const out = (0, await registry.getItem("/unknown"));
            expected(out).toBeNil();
            const log = monitor.log(client);
            expected(log.calls).equalTo(1);
          }
        });
      }
    });
    suite("downloadItem()", () => {
      {
        test("when conn has downloadItem, its homonym must be called", async () => {
          {
            const client = monitor(interceptor(createConnector(), {
              'downloadItem': method.resolves(true)
            }), {
              'methods': ["downloadItem"]
            });
            const registry = (0, await Registry({
              'name': name,
              'client': client
            }).connect());
            const itemPath = "/jobs/catalogs/test.yaml";
            const localPath = path.join(os.tmpdir(), ".apm/jobs/catalogs");
            const out = (0, await registry.downloadItem(itemPath, localPath));
            expected(out).equalTo(true);
            const log = monitor.log(client);
            expected(log.calls).equalTo(1);
            expected(log.calledWith([itemPath, localPath, undefined])).equalTo(1);
          }
        });
        test("when conn hasn't downloadItem, false must be called", async () => {
          {
            const client = createConnector();
            const registry = (0, await Registry({
              'name': name,
              'client': client
            }).connect());
            const itemPath = "/jobs/catalogs/test.yaml";
            const localPath = path.join(os.tmpdir(), ".apm/jobs/catalogs");
            const out = (0, await registry.downloadItem(itemPath, localPath));
            expected(out).equalTo(false);
          }
        });
      }
    });
  }
});