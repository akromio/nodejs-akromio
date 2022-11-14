"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  HttpConnector
} = _core.dogma.use(require("../../../.."));
suite(__filename, () => {
  {
    const host = "siasky.net";
    const base = "/0007rdh37vandm5ndsgmabb1o3t2k4iuiniohaovgnvphp9lj1aeoj0";
    function createConnector() {
      {
        return HttpConnector({
          'host': host,
          'base': base
        });
      }
    }
    suite("getItem()", () => {
      {
        test("when item unexists, nil must be returned", async () => {
          {
            const conn = createConnector();
            const out = (0, await conn.getItem("/jobs/catalogs/unknown"));
            expected(out).toBeNil();
          }
        });
        test("when item exists, item must be returned", async () => {
          {
            const conn = createConnector();
            const itemPath = "/jobs/catalogs/empty.yaml";
            const out = (0, await conn.getItem(itemPath));
            expected(out).toHave({
              'name': itemPath,
              'cty': "text/yaml"
            });
            expected(out.value.toString()).toInclude("spec: v1.0");
          }
        });
      }
    });
  }
});