"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const path = _core.dogma.use(require("path"));
const {
  LocalRepository: Repository
} = _core.dogma.use(require("../../../.."));
suite(__filename, () => {
  {
    const basePath = path.join(__dirname, "../../../data/local");
    suite("getDatum()", () => {
      {
        test("when datum unexists, nil must be returned", async () => {
          {
            const repository = Repository({
              'name': "local",
              'basePath': basePath
            });
            const out = (0, await repository.get("unknown"));
            expected(out).toBeNil();
          }
        });
        test("when datum is a yaml file, this must be read and parsed", async () => {
          {
            const repository = Repository({
              'name': "local",
              'basePath': basePath,
              'extensions': [".yaml"]
            });
            const out = (0, await repository.get("y"));
            expected(out).toBeMap().equalTo({
              'spec': "v1.0",
              'cty': "yaml"
            });
          }
        });
        test("when datum is a json file, this must be read and parsed", async () => {
          {
            const repository = Repository({
              'name': "local",
              'basePath': basePath,
              'extensions': [".json"]
            });
            const out = (0, await repository.get("j"));
            expected(out).toBeMap().equalTo({
              'spec': "v1.0",
              'cty': "json"
            });
          }
        });
      }
    });
  }
});