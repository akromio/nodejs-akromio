"use strict";

var _core = require("@dogmalang/core");
const axios = _core.dogma.use(require("axios"));
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor,
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const pi = _core.dogma.use(require("../../.."));
const op = pi.ops.get;
suite(__filename, () => {
  {
    const buildParams = op.parameterizer;
    const buildTitle = op.title;
    const handler = op.fun;
    const url = "https://www.google.es";
    suite("buildParams()", () => {
      {
        test("when url, {url} must be returned", async () => {
          {
            const out = buildParams(url);
            expected(out).equalTo({
              ["url"]: url
            });
          }
        });
        test("when [url, opts], {url, opts} must be returned", () => {
          {
            const opts = {
              ["headers"]: {
                ["X-Requested-With"]: "akromio"
              }
            };
            const out = buildParams([url, opts]);
            expected(out).equalTo({
              ["url"]: url,
              ["opts"]: opts
            });
          }
        });
      }
    });
    suite("buildTitle()", () => {
      {
        test("when called, a title must be returned", () => {
          {
            const params = {
              ["url"]: url
            };
            const out = buildTitle(params);
            expected(out).equalTo(`http: get '${params.url}'`);
          }
        });
      }
    });
    suite("handler()", () => {
      {
        const originalGet = axios.get;
        teardown(() => {
          {
            axios.get = originalGet;
          }
        });
        test("when called w/o options, {} is used and a response must be returned", async () => {
          {
            const resp = {
              ["status"]: 200,
              ["statusText"]: "OK"
            };
            const get = monitor(simulator.fun({
              'resolves': resp
            }));
            _core.dogma.update(axios, {
              name: "get",
              visib: ".",
              assign: "=",
              value: get
            });
            const out = (0, await handler({
              ["params"]: {
                ["url"]: url
              }
            }));
            const log = monitor.log(get, {
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
            const get = monitor(simulator.fun({
              'resolves': resp
            }));
            _core.dogma.update(axios, {
              name: "get",
              visib: ".",
              assign: "=",
              value: get
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
            const log = monitor.log(get, {
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