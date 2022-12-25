"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const JobCatalogMerger = _core.dogma.use(require("./JobCatalogMerger"));
suite(__filename, () => {
  {
    const merger = JobCatalogMerger();
    suite("mergePlugins()", () => {
      {
        test("when available plugins, extensor plugins are appended at the end of the extended one, removing the extended", () => {
          {
            const extended = {
              ["plugins"]: [{
                ["plugin"]: "x",
                ["impl"]: "plugin",
                ["desc"]: "extended"
              }, {
                ["plugin"]: "y",
                ["impl"]: "plugin",
                ["desc"]: "extended"
              }, {
                ["plugin"]: "z",
                ["impl"]: "plugin",
                ["desc"]: "extended"
              }]
            };
            const extensor = {
              ["plugins"]: [{
                ["plugin"]: "y",
                ["impl"]: "plugin",
                ["desc"]: "extensor"
              }, {
                ["plugin"]: "a",
                ["impl"]: "plugin",
                ["desc"]: "extensor"
              }]
            };
            const out = merger.merge(extensor, extended);
            expected(out.plugins).equalTo([{
              ["plugin"]: "x",
              ["impl"]: "plugin",
              ["desc"]: "extended"
            }, {
              ["plugin"]: "z",
              ["impl"]: "plugin",
              ["desc"]: "extended"
            }, {
              ["plugin"]: "y",
              ["impl"]: "plugin",
              ["desc"]: "extensor"
            }, {
              ["plugin"]: "a",
              ["impl"]: "plugin",
              ["desc"]: "extensor"
            }]);
          }
        });
        test("when plugins are unavailable, empty list must be used", () => {
          {
            const extended1 = {};
            const extended2 = {
              ["plugins"]: [{
                ["plugin"]: "x",
                ["impl"]: "plugin",
                ["desc"]: "extended2"
              }, {
                ["plugin"]: "y",
                ["impl"]: "plugin",
                ["desc"]: "extended2"
              }, {
                ["plugin"]: "z",
                ["impl"]: "plugin",
                ["desc"]: "extended2"
              }]
            };
            const extensor = {};
            const out = merger.merge(extensor, extended1, extended2);
            expected(out.plugins).equalTo([{
              ["plugin"]: "x",
              ["impl"]: "plugin",
              ["desc"]: "extended2"
            }, {
              ["plugin"]: "y",
              ["impl"]: "plugin",
              ["desc"]: "extended2"
            }, {
              ["plugin"]: "z",
              ["impl"]: "plugin",
              ["desc"]: "extended2"
            }]);
          }
        });
      }
    });
    suite("mergeJobs()", () => {
      {
        test("when called, extensor jobs are appended at the end of the extended one, removing the extended", () => {
          {
            const extended = {
              ["jobs"]: [{
                ["macro"]: "x",
                ["desc"]: "extended",
                ["steps"]: []
              }, {
                ["macro"]: "y",
                ["desc"]: "extended",
                ["steps"]: []
              }, {
                ["macro"]: "z",
                ["desc"]: "extended",
                ["steps"]: []
              }]
            };
            const extensor = {
              ["jobs"]: [{
                ["macro"]: "y",
                ["desc"]: "extensor",
                ["steps"]: []
              }, {
                ["macro"]: "a",
                ["desc"]: "extensor",
                ["steps"]: []
              }]
            };
            const out = merger.merge(extensor, extended);
            expected(out.jobs).equalTo([{
              ["macro"]: "x",
              ["desc"]: "extended",
              ["steps"]: []
            }, {
              ["macro"]: "z",
              ["desc"]: "extended",
              ["steps"]: []
            }, {
              ["macro"]: "y",
              ["desc"]: "extensor",
              ["steps"]: []
            }, {
              ["macro"]: "a",
              ["desc"]: "extensor",
              ["steps"]: []
            }]);
          }
        });
        test("when jobs are unavailable, empty list must be used", () => {
          {
            const extensor = {};
            const extended1 = {};
            const extended2 = {
              ["jobs"]: [{
                ["macro"]: "x",
                ["desc"]: "extended2",
                ["steps"]: []
              }, {
                ["macro"]: "y",
                ["desc"]: "extended2",
                ["steps"]: []
              }, {
                ["co"]: "z",
                ["desc"]: "extended2",
                ["steps"]: []
              }]
            };
            const out = merger.merge(extensor, extended1, extended2);
            expected(out.jobs).equalTo([{
              ["macro"]: "x",
              ["desc"]: "extended2",
              ["steps"]: []
            }, {
              ["macro"]: "y",
              ["desc"]: "extended2",
              ["steps"]: []
            }, {
              ["co"]: "z",
              ["desc"]: "extended2",
              ["steps"]: []
            }]);
          }
        });
      }
    });
  }
});