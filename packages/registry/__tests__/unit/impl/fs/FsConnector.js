"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const path = _core.dogma.use(require("path"));
const {
  FsConnector: Connector
} = _core.dogma.use(require("../../../.."));
suite(__filename, () => {
  {
    const basePath = path.join(__dirname, "../../../data/connector/fs");
    function createConnector() {
      {
        return Connector({
          'basePath': basePath
        });
      }
    }
    suite("connect()", () => {
      {
        test("when called, nothing to do", () => {
          {
            const conn = createConnector();
            const out = conn.connect();
            expected(out).sameAs(out);
          }
        });
      }
    });
    suite("disconnect()", () => {
      {
        test("when called, nothing to do", () => {
          {
            const conn = createConnector().connect();
            const out = conn.disconnect();
            expected(out).sameAs(out);
          }
        });
      }
    });
    suite("InternalConnector.buildItemPath()", () => {
      {
        const conn = createConnector().connect();
        test("when relative path, error must be raised", async () => {
          {
            const out = await _core.dogma.pawait(() => conn.getItem("relative"));
            expected(out).it(0).equalTo(false).it(1).toBe(Error).like("Path must be absolute and start with slash").like("Got: relative.");
          }
        });
      }
    });
    suite("getItem()", () => {
      {
        const conn = createConnector().connect();
        test("when item unexists, nil must be returned", async () => {
          {
            const out = (0, await conn.getItem("/jobs.yaml"));
            expected(out).toBeNil();
          }
        });
        test("when item is a yaml file, value and mime must be returned", async () => {
          {
            const out = (0, await conn.getItem("/catalogs/jobs.yaml"));
            expected(out).toBeMap().equalTo({
              'name': "/catalogs/jobs.yaml",
              'cty': "text/yaml",
              'value': "spec: v1.0\ncty: yaml"
            });
          }
        });
        test("when item is a json file, value and mime must be returned", async () => {
          {
            const out = (0, await conn.getItem("/catalogs/jobs.json"));
            expected(out).toBeMap().equalTo({
              'name': "/catalogs/jobs.json",
              'cty': "application/json",
              'value': "{\n  \"spec\": \"v1.0\",\n  \"cty\": \"json\"\n}"
            });
          }
        });
      }
    });
  }
});