"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  Registry,
  RegistryBuilder,
  RegistryStringParser
} = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    const builder = RegistryBuilder();
    const parser = RegistryStringParser();
    const defaults = {
      ["git"]: {
        ["user"]: "akromio",
        ["repo"]: "builtin-catalog",
        ["branch"]: "master",
        ["prefix"]: ""
      },
      ["http"]: {
        ["host"]: "siasky.net",
        ["base"]: "/0007rdh37vandm5ndsgmabb1o3t2k4iuiniohaovgnvphp9lj1aeoj0"
      },
      ["skynet"]: {
        ["portal"]: "siasky.net"
      }
    };
    suite("create()", () => {
      {
        test("when fs, a FsConnector must be used", () => {
          {
            const out = builder.create(parser.parse("test=fs:///my/dir", defaults));
            expected(out).toBe(Registry).toHave({
              'name': "test"
            }).member("client").toBe("FsConnector");
          }
        });
        test("when git, a GitConnector must be used", () => {
          {
            const out = builder.create(parser.parse("test=git://repo", defaults));
            expected(out).toBe(Registry).toHave({
              'name': "test"
            }).member("client").toBe("GitConnector");
          }
        });
        test("when http, a HttpConnector must be used", () => {
          {
            const out = builder.create(parser.parse("test=http://siasky.net", defaults));
            expected(out).toBe(Registry).toHave({
              'name': "test"
            }).member("client").toBe("HttpConnector");
          }
        });
        test("when skynet, a SkynetConnector must be used", () => {
          {
            const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";
            const out = builder.create(parser.parse(`test=skynet://${skylink}`, defaults));
            expected(out).toBe(Registry).toHave({
              'name': "test"
            }).member("client").toBe("SkynetConnector");
          }
        });
      }
    });
  }
});