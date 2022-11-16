"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const op = pi.ops.set;
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    suite("buildParams()", () => {
      {
        test("when args, {name = args[0], value = args[1]} must be returned", () => {
          {
            const args = ["NODE_EXTRA_CA_CERTS", "cosmosdb-emulator.crt"];
            const out = buildParams(args);
            expected(out).equalTo({
              'name': _core.dogma.getItem(args, 0),
              'value': _core.dogma.getItem(args, 1)
            });
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, a text title must be returned", () => {
          {
            const params = {
              ["name"]: "NODE_EXTRA_CA_CERTS",
              ["value"]: "cosmosdb-emulator.crt"
            };
            const out = buildTitle(params);
            expected(out).equalTo("env: set 'NODE_EXTRA_CA_CERTS' to 'cosmosdb-emulator.crt'");
          }
        });
      }
    });
    suite("handle()", () => {
      {
        test("when called, ps.env must be updated with the var", () => {
          {
            const params = {
              ["name"]: "NODE_EXTRA_CA_CERTS",
              ["value"]: "cosmosdb-emulator.crt"
            };
            const out = handler({
              'params': params
            });
            expected(out).toBeMap();
            expected(_core.ps.env).toHave({
              'NODE_EXTRA_CA_CERTS': "cosmosdb-emulator.crt"
            });
          }
        });
      }
    });
  }
});