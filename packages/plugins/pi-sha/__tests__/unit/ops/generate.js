"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const pi = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    const op = pi.ops.generate;
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    suite("buildParams()", () => {
      {
        test("when text, {data} must be returned", () => {
          {
            const data = "ciao!";
            const out = buildParams(data);
            expected(out).equalTo({
              'data': data
            });
          }
        });
        test("when [text, algorithm], {data, algorithm} must be returned", () => {
          {
            const data = "ciao!";
            const algorithm = "SHA-512";
            const out = buildParams([data, algorithm]);
            expected(out).equalTo({
              'data': data,
              'algorithm': algorithm
            });
          }
        });
        test("when {data}, {data} must be returned", () => {
          {
            const data = "ciao!";
            const out = buildParams({
              'data': data
            });
            expected(out).equalTo({
              'data': data
            });
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called with algorithm, a title must be generated with it and returned", () => {
          {
            const params = {
              ["algorithm"]: "SHA-512"
            };
            const out = buildTitle(params);
            expected(out).equalTo("sha: generate hash with 'SHA-512'");
          }
        });
        test("when called w/o algorithm, a title must be generated with SHA-512 and returned", () => {
          {
            const params = {};
            const out = buildTitle(params);
            expected(out).equalTo("sha: generate hash with 'SHA-512'");
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const hash = "edfe3ce299ac088010d9fbee30c4e0b230db29e165a1ae52d2cc9cc5cb10952fec46723f03d5eb23354e2e23e997f6c6d9e405c43d03526be7d3a7210fc40593";
        test("when called w/o algorithm, a hash must be generated with default algorithm and returned", async () => {
          {
            const data = "ciao!";
            const out = (0, await handler({
              'params': {
                ["data"]: data
              }
            }));
            expected(out).equalTo(hash);
          }
        });
        test("when called w/ algorithm, a hash must be generated with it and returned", async () => {
          {
            const data = "ciao!";
            const out = (0, await handler({
              'params': {
                ["data"]: data,
                ["algorithm"]: "SHA-512"
              }
            }));
            expected(out).equalTo(hash);
          }
        });
      }
    });
  }
});