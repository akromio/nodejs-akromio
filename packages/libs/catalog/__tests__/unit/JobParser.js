"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  Ops
} = _core.dogma.use(require("@akromio/core"));
const {
  JobParser
} = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    const parser = JobParser();
    const ops = Ops();
    suite("pareJob()", () => {
      {
        test("when macro, a macro instance must be returned", () => {
          {
            const decl = {
              ["macro"]: "test",
              ["steps"]: []
            };
            const out = parser.parseJob(decl, {
              'ops': ops
            });
            expected(out).toBe("CatalogMacro").toHave({
              'name': "test"
            });
          }
        });
        test("when loop, a loop instance must be returned", () => {
          {
            const decl = {
              ["loop"]: "test",
              ["steps"]: [],
              ["forEach"]: []
            };
            const out = parser.parseJob(decl, {
              'ops': ops
            });
            expected(out).toBe("CatalogLoop").toHave({
              'name': "test"
            });
          }
        });
        test("when co, a co instance must be returned", () => {
          {
            const decl = {
              ["co"]: "test",
              ["steps"]: []
            };
            const out = parser.parseJob(decl, {
              'ops': ops
            });
            expected(out).toBe("CatalogCo").toHave({
              'name': "test"
            });
          }
        });
        test("when script, a script instance must be returned", () => {
          {
            const decl = {
              ["script"]: "test",
              ["code"]: ""
            };
            const out = parser.parseJob(decl, {
              'ops': ops
            });
            expected(out).toBe("Script").toHave({
              'name': "test"
            });
          }
        });
        test("when group, a job list with the group tag must be returned", () => {
          {
            const decl = {
              ["group"]: "testing",
              ["jobs"]: [{
                ["macro"]: "test1",
                ["tags"]: ["test"],
                ["steps"]: []
              }, {
                ["macro"]: "test2",
                ["tags"]: ["test"],
                ["steps"]: []
              }]
            };
            const out = parser.parseJob(decl, {
              'ops': ops
            });
            expected(out).toHaveLen(2).it(0).toBe("CatalogMacro").toHave({
              'name': "test1",
              'tags': ["test", "testing"]
            }).it(1).toBe("CatalogMacro").toHave({
              'name': "test2",
              'tags': ["test", "testing"]
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
    suite("parseJobs()", () => {
      {
        test("when jobs, these must be parsed and returned as a map", () => {
          {
            const macro1 = {
              ["macro"]: "test1",
              ["ini"]: [],
              ["steps"]: [],
              ["fin"]: []
            };
            const macro2 = {
              ["loop"]: "test2",
              ["ini"]: [],
              ["steps"]: [],
              ["fin"]: [],
              ["forEach"]: []
            };
            const macro3 = {
              ["macro"]: "test3",
              ["steps"]: []
            };
            const group = {
              ["group"]: "testing",
              ["jobs"]: [macro1, macro2]
            };
            const decl = [group, macro3];
            const out = parser.parseJobs(decl, {
              'ops': ops
            });
            expected(out).toHaveLen(3).member("test1").toBe("CatalogMacro").toHave({
              'name': "test1",
              'tags': ["testing"]
            }).member("test2").toBe("CatalogLoop").toHave({
              'name': "test2",
              'tags': ["testing"]
            }).member("test3").toBe("CatalogMacro").toHave({
              'name': "test3"
            });
          }
        });
      }
    });
  }
});