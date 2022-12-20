"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const VarDatum = _core.dogma.use(require("../datum/VarDatum"));
const ConstDatum = _core.dogma.use(require("../datum/ConstDatum"));
const DatumFn = _core.dogma.use(require("../datum/DatumFn"));
const Constraints = _core.dogma.use(require("../constraints/Constraints"));
const EnumConstraint = _core.dogma.use(require("../constraints/EnumConstraint"));
const GlobalDataset = _core.dogma.use(require("./GlobalDataset"));
const LocalDataset = _core.dogma.use(require("./LocalDataset"));
const DatasetDescriber = _core.dogma.use(require("./DatasetDescriber"));
suite(__filename, () => {
  {
    suite("describeData()", () => {
      {
        const globalDataset = GlobalDataset({
          'name': "global"
        });
        const localDataset = LocalDataset({
          'name': "local",
          'parent': globalDataset
        });
        const desc = DatasetDescriber();
        globalDataset.setDatum(VarDatum({
          'name': "v",
          'desc': "A variable.",
          'value': "xyz"
        })).setDatum(ConstDatum({
          'name': "c",
          'desc': "A constant.",
          'value': "zyx"
        })).setDatum(ConstDatum({
          'name': "e",
          'value': "one",
          'constraints': Constraints().appendConstraint(EnumConstraint({
            'options': ["one", "two", "three"]
          })),
          'tags': ["enum"]
        })).setDatum(DatumFn({
          'name': "f",
          'value': () => {
            {
              return "hello!";
            }
          }
        })).setDatum(ConstDatum({
          'name': "p",
          'desc': "A password.",
          'value': "my pass",
          'tags': ["password"]
        })).setDatum(ConstDatum({
          'name': "h",
          'desc': "A hidden datum.",
          'tags': ["hidden"]
        }));
        localDataset.setDatum(VarDatum({
          'name': "v",
          'desc': "Local var.",
          'value': "XYZ"
        }));
        test("when global dataset, the repr of its data must be returned", () => {
          {
            const out = desc.describeData(globalDataset);
            expected(out).equalTo({
              'v': {
                ["kind"]: "var",
                ["value"]: "xyz",
                ["desc"]: "A variable."
              },
              'c': {
                ["kind"]: "const",
                ["value"]: "zyx",
                ["desc"]: "A constant."
              },
              'e': {
                ["kind"]: "const",
                ["value"]: "one",
                ["desc"]: "",
                ["options"]: ["one", "two", "three"]
              },
              'f': {
                ["kind"]: "fn",
                ["value"]: "hello!",
                ["desc"]: ""
              },
              'p': {
                ["kind"]: "const",
                ["value"]: "*****",
                ["desc"]: "A password."
              }
            });
          }
        });
        test("when local dataset, the local data must override global data", () => {
          {
            const out = desc.describeData(localDataset, {
              'showPasswordValues': true
            });
            expected(out).equalTo({
              'v': {
                ["kind"]: "var",
                ["value"]: "XYZ",
                ["desc"]: "Local var."
              },
              'c': {
                ["kind"]: "const",
                ["value"]: "zyx",
                ["desc"]: "A constant."
              },
              'e': {
                ["kind"]: "const",
                ["value"]: "one",
                ["desc"]: "",
                ["options"]: ["one", "two", "three"]
              },
              'f': {
                ["kind"]: "fn",
                ["value"]: "hello!",
                ["desc"]: ""
              },
              'p': {
                ["kind"]: "const",
                ["value"]: "my pass",
                ["desc"]: "A password."
              }
            });
          }
        });
        test("when tag set, only data with this tag must be returned", () => {
          {
            const out = desc.describeData(localDataset, {
              'tag': "enum"
            });
            expected(out).equalTo({
              'e': {
                ["kind"]: "const",
                ["value"]: "one",
                ["desc"]: "",
                ["options"]: ["one", "two", "three"]
              }
            });
          }
        });
      }
    });
  }
});