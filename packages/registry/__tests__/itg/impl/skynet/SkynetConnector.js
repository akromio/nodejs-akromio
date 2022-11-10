"use strict";

var _core = require("@dogmalang/core");
const path = _core.dogma.use(require("path"));
const os = _core.dogma.use(require("os"));
const fsx = _core.dogma.use(require("fs-extra"));
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  SkynetClient
} = _core.dogma.use(require("@skynetlabs/skynet-nodejs"));
const {
  SkynetConnector
} = _core.dogma.use(require("../../../.."));
suite(__filename, () => {
  {
    function createConnector(client) {
      /* c8 ignore next */_core.dogma.expect("client", client);
      {
        return SkynetConnector({
          'client': client,
          'skylink': skylink
        });
      }
    }
    const portal = "https://siasky.net";
    const skylink = "0007rdh37vandm5ndsgmabb1o3t2k4iuiniohaovgnvphp9lj1aeoj0";
    const conn = createConnector(new SkynetClient(portal));
    suite("getItem()", () => {
      {
        test("when item unexists, nil must be returned", async () => {
          {
            const out = (0, await conn.getItem("/jobs/catalogs/unknown"));
            expected(out).toBeNil();
          }
        });
        test("when item exists, item must be returned", async () => {
          {
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
    suite("downloadItem()", () => {
      {
        const apmPath = path.join(os.tmpdir(), ".apm");
        const catalogPath = "/jobs/catalogs";
        setup(async () => {
          {
            0, await fsx.remove(apmPath);
          }
        });
        test("when dir item exists, this dir is saved in the local fs", async () => {
          {
            const itemPath = path.join(catalogPath);
            const localPath = path.join(apmPath, itemPath);
            const out = (0, await conn.downloadItem(itemPath, localPath, {
              'unzip': true,
              'overwrite': true
            }));
            expected(out).equalTo(true);
            expected.file(localPath, "empty.yaml").toExist();
          }
        });
        test("when file item exists, this file is saved in the local fs", async () => {
          {
            const itemPath = path.join(catalogPath, "empty.yaml");
            const localPath = path.join(apmPath, itemPath);
            const out = (0, await conn.downloadItem(itemPath, localPath, {
              'unzip': true,
              'overwrite': true
            }));
            expected(out).equalTo(true);
            expected.file(localPath).toExist();
          }
        });
      }
    });
  }
});