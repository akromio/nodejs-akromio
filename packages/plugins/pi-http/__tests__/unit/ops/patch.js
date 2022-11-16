"use strict";

var _core = require("@dogmalang/core");
const axios = _core.dogma.use(require("axios"));
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.patch;
suite(__filename, () => {
  {
    const buildTitle = op.title;
    const handler = op.fun;
    const url = "https://www.google.es";
    suite("buildTitle()", () => {
      {
        test("when called, a title must be returned", () => {
          {
            const params = {
              ["url"]: url
            };
            const out = buildTitle(params);
            expected(out).equalTo(`http: patch '${params.url}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const originalPatch = axios.patch;
        teardown(() => {
          {
            axios.patch = originalPatch;
          }
        });
        test("when called w/o options, {} is used and a response must be returned", async () => {
          {
            const resp = {
              ["status"]: 200,
              ["statusText"]: "OK"
            };
            const patch = monitor(simulator.fun({
              'resolves': resp
            }));
            _core.dogma.update(axios, {
              name: "patch",
              visib: ".",
              assign: "=",
              value: patch
            });
            const out = (0, await handler({
              ["params"]: {
                ["url"]: url
              }
            }));
            const log = monitor.log(patch, {
              'clear': true
            });
            expected(out).equalTo(resp);
            expected(log).toHaveLen(1);
            expected(log.calledWith([url, {}])).equalTo(1);
          }
        });
        test("when called w/ options, these options used and a response must be returned", async () => {
          {
            const resp = {
              ["status"]: 200,
              ["statusText"]: "OK"
            };
            const patch = monitor(simulator.fun({
              'resolves': resp
            }));
            _core.dogma.update(axios, {
              name: "patch",
              visib: ".",
              assign: "=",
              value: patch
            });
            const opts = {
              ["headers"]: {
                ["X-Requested-With"]: "akromio"
              }
            };
            const out = (0, await handler({
              ["params"]: {
                ["url"]: url,
                ["opts"]: opts
              }
            }));
            const log = monitor.log(patch, {
              'clear': true
            });
            expected(out).equalTo(resp);
            expected(log).toHaveLen(1);
            expected(log.calledWith([url, opts])).equalTo(1);
          }
        });
      }
    });
  }
});