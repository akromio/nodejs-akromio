"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  v4: uuid
} = _core.dogma.use(require("uuid"));
const Result = _core.dogma.use(require("./Result"));
suite(__filename, () => {
  {
    suite("returned", () => {
      {
        test("when called, this must return value", () => {
          {
            const result = Result({
              'callId': uuid(),
              'title': "the title",
              'duration': 1,
              'kind': "ok",
              'value': "simple",
              'onError': "carryOn"
            });
            const out = result.returned;
            expected(out).equalTo("simple");
          }
        });
      }
    });
    suite("raised", () => {
      {
        test("when called, this must return value", () => {
          {
            const result = Result({
              'callId': uuid(),
              'title': "the title",
              'duration': 1,
              'kind': "failed",
              'value': Error("mind"),
              'onError': "carryOn"
            });
            const out = result.raised;
            expected(out).equalTo(Error("mind"));
          }
        });
      }
    });
  }
});