"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const buildOpts = _core.dogma.use(require("./_buildOpts"));
suite(__filename, () => {
  {
    test("when workDir unset, nothing to do", () => {
      {
        const opts = {};
        const out = buildOpts(opts);
        expected(out).notSameAs(opts);
        expected(out).equalTo(opts);
      }
    });
    test("when workDir set, workdDir must be replaced by cwd", () => {
      {
        const opts = {
          ["workDir"]: "/tmp/my/dir"
        };
        const out = buildOpts(opts);
        expected(out).notSameAs(opts);
        expected(out).equalTo({
          'cwd': "/tmp/my/dir"
        });
      }
    });
  }
});