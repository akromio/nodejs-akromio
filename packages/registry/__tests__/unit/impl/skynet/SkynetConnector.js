"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs/promises"));
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const {
  SkynetClient
} = _core.dogma.use(require("@skynetlabs/skynet-nodejs"));
const {
  SkynetConnector
} = _core.dogma.use(require("../../../.."));
suite(__filename, () => {
  {
    const skylink = "0007rdh37vandm5ndsgmabb1o3t2k4iuiniohaovgnvphp9lj1aeoj0";
    function createConnector(client, fs) {
      /* c8 ignore next */_core.dogma.expect("client", client); /* c8 ignore next */
      _core.dogma.expect("fs", fs);
      {
        return SkynetConnector({
          'client': client,
          'skylink': skylink,
          'fs': fs
        });
      }
    }
    suite("getItem()", () => {
      {
        test("when item unexists, nil must be returned", async () => {
          {
            const skynet = simulator(SkynetClient, {
              'downloadData': method.rejects()
            });
            const conn = createConnector(skynet, fs);
            const out = (0, await conn.getItem("/jobs/catalogs/unknown"));
            expected(out).toBeNil();
          }
        });
        test("when item exists, item must be returned", async () => {
          {
            const content = Buffer.from("spec: v1.0\njobs: []");
            const client = simulator(SkynetClient, {
              'downloadData': method.resolves(content)
            });
            const conn = createConnector(client, fs);
            const itemPath = "/jobs/catalogs/empty.yaml";
            const out = (0, await conn.getItem(itemPath));
            expected(out).toHave({
              'cty': "text/yaml"
            });
            expected.path(out.name).equalTo(itemPath);
            expected(out.value.toString()).toInclude("spec: v1.0");
          }
        });
      }
    });
  }
});