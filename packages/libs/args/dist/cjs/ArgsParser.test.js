"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  fun
} = _core.dogma.use(require("@akromio/doubles"));
const ArgsParser = _core.dogma.use(require("./ArgsParser"));
suite(__filename, () => {
  {
    const parser = ArgsParser({
      'prefix': "KRM_ARG_"
    });
    suite("parse()", () => {
      {
        suite("in-line argument", () => {
          {
            test("when env variables, these must be parsed and returned in a map", async () => {
              {
                const env = {
                  ["KRM_ARG_x"]: 1,
                  ["KRM_ARG_y"]: 2,
                  ["ARG_z"]: 3
                };
                const out = (0, await parser.parse([], env, _core.dogma.nop()));
                expected(out).equalTo({
                  'x': 1,
                  'y': 2
                });
              }
            });
            test("when arg lines, these must be parsed and returned in a map", async () => {
              {
                const args = ["x=1", "y = 2"];
                const out = (0, await parser.parse(args, {}, _core.dogma.nop()));
                expected(out).equalTo({
                  'x': 1,
                  'y': 2
                });
              }
            });
            test("when encoded value in json, this must be decoded and returned", async () => {
              {
                const value = {
                  ["x"]: 1,
                  ["y"]: 2
                };
                const args = ["arg=json://" + _core.json.encode(value)];
                const out = (0, await parser.parse(args, {}, _core.dogma.nop()));
                expected(out).equalTo({
                  'arg': value
                });
              }
            });
            test("when encoded value in json+base64, this must be decoded and returned", async () => {
              {
                const value = {
                  ["x"]: 1,
                  ["y"]: 2,
                  ["z"]: 3
                };
                const arg = Buffer.from(_core.json.encode(value)).toString("base64");
                const args = ["arg=json+base64://" + arg];
                const out = (0, await parser.parse(args, {}, _core.dogma.nop()));
                expected(out).equalTo({
                  'arg': value
                });
              }
            });
          }
        });
        test("when arg files, these must be parsed and returned in a map", async () => {
          {
            const filePaths = ["args1.yaml", "args2.yaml"];
            const resolver = fun([{
              ["args"]: ["args1.yaml"],
              ["resolves"]: {
                ["x"]: 1,
                ["y"]: 1
              }
            }, {
              ["args"]: ["args2.yaml"],
              ["resolves"]: {
                ["y"]: 2,
                ["z"]: 3
              }
            }]);
            const out = (0, await parser.parse(filePaths, {}, resolver));
            expected(out).equalTo({
              'x': 1,
              'y': 2,
              'z': 3
            });
          }
        });
      }
    });
  }
});