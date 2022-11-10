"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  QuestionDescriber
} = _core.dogma.use(require("../.."));
suite(__filename, () => {
  {
    const desc = QuestionDescriber();
    suite("describe()", () => {
      {
        test("when ok, a map with the questions must be returned", () => {
          {
            const questions = [{
              ["input"]: "i",
              ["title"]: "The input",
              ["defaultValue"]: "123"
            }, {
              ["confirm"]: "c",
              ["title"]: "The confirm",
              ["defaultValue"]: false
            }, {
              ["select"]: "s",
              ["title"]: "The select",
              ["options"]: [1, 2, 3]
            }, {
              ["select"]: "sm",
              ["multiple"]: true,
              ["title"]: "The select",
              ["options"]: [1, 2, 3],
              ["selected"]: 2
            }];
            const out = desc.describe(questions);
            expected(out).equalTo({
              'i': {
                ["type"]: "input",
                ["title"]: "The input",
                ["defaultValue"]: "123"
              },
              'c': {
                ["type"]: "confirm",
                ["title"]: "The confirm",
                ["defaultValue"]: false
              },
              's': {
                ["type"]: "select",
                ["title"]: "The select",
                ["options"]: [1, 2, 3],
                ["defaultValue"]: undefined
              },
              'sm': {
                ["type"]: "select[]",
                ["title"]: "The select",
                ["options"]: [1, 2, 3],
                ["defaultValue"]: 2
              }
            });
          }
        });
      }
    });
  }
});