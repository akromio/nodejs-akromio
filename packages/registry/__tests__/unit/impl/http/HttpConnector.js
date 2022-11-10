"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  interceptor,
  method
} = _core.dogma.use(require("@akromio/doubles"));
const axios = _core.dogma.use(require("axios"));
const path = _core.dogma.use(require("path"));
const {
  HttpConnector
} = _core.dogma.use(require("../../../.."));
suite(__filename, () => {
  {
    const host = "skynet.apm.akromio.com";
    const base = "/";
    function createConnector(client) {
      /* c8 ignore next */_core.dogma.expect("client", client);
      {
        return HttpConnector({
          'client': client,
          'host': host,
          'base': base
        });
      }
    }
    suite("getItem()", () => {
      {
        test("when item unexists, nil must be returned", async () => {
          {
            const client = interceptor(axios, {
              'get': method.returns({
                'status': 404
              })
            });
            const conn = createConnector(client);
            const out = (0, await conn.getItem("/unknown"));
            expected(out).toBeNil();
          }
        });
        test("when item exists, value and content-type must be returned", async () => {
          {
            const client = interceptor(axios, {
              'get': method({
                'returns': {
                  ["status"]: 200,
                  ["headers"]: {
                    ["content-type"]: "text/yaml"
                  },
                  ["data"]: "spec: v1.0\ncty: yaml"
                }
              })
            });
            const conn = createConnector(client);
            const out = (0, await conn.getItem("/jobs.yaml"));
            expected(out).toBeMap().equalTo({
              'name': "/jobs.yaml",
              'cty': "text/yaml",
              'value': "spec: v1.0\ncty: yaml"
            });
          }
        });
      }
    });
  }
});