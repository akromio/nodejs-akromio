"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const JobCatalogMerger = _core.dogma.use(require("./JobCatalogMerger"));
suite(__filename, () => {
  {
    const merger = JobCatalogMerger();
    suite("merge()", () => {
      {
        test("when called, mix must be performed and returned", () => {
          {
            const extended = {};
            const extensor = {
              ["spec"]: "v1.0",
              ["dataset"]: [{
                ["const"]: "myconst"
              }, {
                ["fn"]: "myfn"
              }],
              ["plugins"]: [{
                ["plugin"]: "myplugin",
                ["impl"]: "plugin"
              }],
              ["jobs"]: [{
                ["macro"]: "mymacro",
                ["steps"]: []
              }, {
                ["co"]: "myco",
                ["steps"]: []
              }]
            };
            const out = merger.merge(extensor, extended);
            expected(out).equalTo({
              'spec': "v1.0",
              'dataset': [{
                ["const"]: "myconst"
              }, {
                ["fn"]: "myfn"
              }],
              'plugins': [{
                ["plugin"]: "myplugin",
                ["impl"]: "plugin"
              }],
              'jobs': [{
                ["macro"]: "mymacro",
                ["steps"]: []
              }, {
                ["co"]: "myco",
                ["steps"]: []
              }]
            });
          }
        });
      }
    });
  }
});