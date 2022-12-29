"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const Ring = _core.dogma.use(require("./Ring"));
suite(__filename, () => {
  {
    suite("next()", () => {
      {
        test("when called and end not reached, the next point must be returned", () => {
          {
            const points = ["zero", "one", "two", "three"];
            const ring = Ring({
              'points': points
            });
            const out1 = ring.next();
            const out2 = ring.next();
            expected(out1).equalTo(_core.dogma.getItem(points, 0));
            expected(out2).equalTo(_core.dogma.getItem(points, 1));
            expected(ring.position).equalTo(2);
          }
        });
        test("when end reached, restart must be performed", () => {
          {
            const points = ["zero", "one"];
            const ring = Ring({
              'points': points
            });
            const out1 = ring.next();
            const out2 = ring.next();
            const out3 = ring.next();
            expected(out1).equalTo(_core.dogma.getItem(points, 0));
            expected(out2).equalTo(_core.dogma.getItem(points, 1));
            expected(out3).equalTo(_core.dogma.getItem(points, 0));
            expected(ring.position).equalTo(1);
          }
        });
      }
    });
  }
});