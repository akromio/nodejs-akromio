"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  Ops
} = _core.dogma.use(require("@akromio/core"));
const JobParser = _core.dogma.use(require("./JobParser"));
suite(__filename, () => {
  {
    const ops = Ops();
    const parser = JobParser();
    const parseOpts = {
      ["ops"]: ops
    };
    suite("pareJob()", () => {
      {
        suite("macro", () => {
          {
            test("when simple macro, a macro instance must be returned", () => {
              {
                const decl = {
                  ["macro"]: "test",
                  ["dataset"]: ["v1", "v2"],
                  ["steps"]: []
                };
                const out = parser.parse([decl], parseOpts);
                expected(out.test).toBe("CatalogMacro").toHave({
                  'name': "test",
                  'dataset': [{
                    ["var"]: "v1"
                  }, {
                    ["var"]: "v2"
                  }]
                });
                expected(out.test.isLoop()).equalTo(false);
              }
            });
            test("when looped macro, a macro instance must be returned", () => {
              {
                const decl = {
                  ["macro"]: "test",
                  ["forEach"]: "range 1 5",
                  ["steps"]: [],
                  ["forEach"]: []
                };
                const out = parser.parse([decl], parseOpts);
                expected(out.test).toBe("CatalogMacro").toHave({
                  'name': "test"
                });
                expected(out.test.isLoop()).equalTo(true);
              }
            });
            test("when jobs, these must be parsed and returned as a map", () => {
              {
                const decl = {
                  ["macro"]: "test",
                  ["ini"]: [],
                  ["steps"]: [],
                  ["fin"]: []
                };
                const out = parser.parse([decl], parseOpts);
                expected(out.test).toBe("CatalogMacro").member("initializers").equalTo([]).member("finalizers").equalTo([]);
              }
            });
            test("when inline ini or fin set, [step] must be returned", () => {
              {
                const decl = {
                  ["macro"]: "test",
                  ["ini"]: "log ini",
                  ["steps"]: [],
                  ["fin"]: "log fin"
                };
                const out = parser.parse([decl], parseOpts);
                expected(out.test.initializers).equalTo(["log ini"]);
                expected(out.test.finalizers).equalTo(["log fin"]);
              }
            });
          }
        });
        suite("co", () => {
          {
            test("when co, a co instance must be returned", () => {
              {
                const decl = {
                  ["co"]: "test",
                  ["steps"]: []
                };
                const out = parser.parse([decl], parseOpts);
                expected(out.test).toBe("CatalogCo").toHave({
                  'name': "test"
                });
              }
            });
          }
        });
        suite("script", () => {
          {
            test("when script, a script instance must be returned", () => {
              {
                const decl = {
                  ["script"]: "test",
                  ["code"]: ""
                };
                const out = parser.parse([decl], parseOpts);
                expected(out.test).toBe("Script").toHave({
                  'name': "test"
                });
              }
            });
          }
        });
        test("when other task and parseAddOnJob() not impemented, error must be raised", () => {
          {
            const decl = {
              ["macr"]: "test",
              ["steps"]: []
            };
            const out = _core.dogma.peval(() => {
              return parser.parseJob(decl, {
                'ops': ops
              });
            });
            expected(out).it(0).equalTo(false).it(1).equalTo(Error("Invalid job declaration: { macr: 'test', steps: [] }."));
          }
        });
      }
    });
  }
});