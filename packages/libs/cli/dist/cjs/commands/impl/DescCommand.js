"use strict";

var _core = require("@dogmalang/core");
const yaml = _core.dogma.use(require("yaml"));
const Command = _core.dogma.use(require("../Command"));
const things = {
  ["env"]: {
    ["desc"]: "The environment used by the tool.",
    ["observations"]: "\n      - The prefix used for the environment variables is KRM_,\n        Akromio without vowels.\n\n      - The .env file must be located in the $KRM_DIR_NAME.\n        The secrets and cryptographic keys should be saved in $KRM_PRIVATE_ENV_FILE.\n        If you don't want to load some of these files, set its environment variable to the empty string.\n\n        The $KRM_PRIVATE_ENV_FILE should contain secrets or private keys, make sure that this is in .gitignore.\n        The secrets and private keys shouldn't be commited to a Git repo.\n\n        Every variable have the following format: name=value or name=\"value\".\n        Comments: #comment to the end of the line.\n      \n      - You can list the environment with the command 'e' or 'env' of the tool.\n    "
  },
  ["registries"]: {
    ["desc"]: "How to use the registries.",
    ["observations"]: "\n      - By default, the following registries are created:\n\n        - local, linked to the current directory.\n\n        - localApm, linked to the APM in the current directory.\n\n        - user, linked to the user home directory.\n      \n      - The default registries to create are set in $KRM_REGISTRIES.\n      \n      - We can use the following registries:\n\n        - fs://localDirAbsolutePath:\n          a filesystem registry bound to the local given dir path.\n        \n        - git://user/repo/branch, git://user/repo, git://repo:\n          a Git registry bound to a GitHub repo.\n          We can configure it with $KRM_REGISTRY_GIT_*.\n\n        - http, http://host/basePath or http://host:\n          an HTTP registry bound to a web service.\n          The $KRM_REGISTRY_HTTP_* can be used.\n\n        - sns, sns://skynetPortal/publicKey/name, sns://publicKey/name,\n          sns://portal/name or sns://name:\n          a Sia Name Service registry, bound to a public key and a data key (or name).\n          All the segments can be set with $KRM_REGISTRY_SNS_*.\n\n        - skynet, skynet://portal/skylink or skynet://skylink:\n          a dir uploaded to Sia Skynet.\n          $KRM_REGISTRY_SKYNET_* available.\n    "
  },
  ["macro"]: {
    ["desc"]: "Creates a catalog macro, that is, a sequence of steps to run one by one.",
    ["examples"]: "\n      - macro: json2yaml\n        desc: Generates a YAML file from a JSON file.\n        steps:\n          - [$data, <file.read, $(args.src)]\n          - [$value, json.decode, $(data)]\n          - [$value, yaml.encode, $(value)]\n          - [file.write, $(value), $(args.dst)]\n    "
  },
  ["co"]: {
    ["desc"]: "Creates an concurrent operation, that is, several steps to run concurrently.",
    ["examples"]: "\n      - co: backup\n        desc: Performs a backup of several files.\n        steps:\n          - [fs.cp, file1.txt, file1.txt.old]\n          - [fs.cp, file2.txt, file2.txt.old]\n    "
  },
  ["dataset"]: {
    ["desc"]: "Creates the data to use in the catalog.",
    ["examples"]: "\n      dataset:\n        - const: src\n          desc: The source file path.\n          value: $(args.src)\n          defaultValue: file.json\n        \n        - var: dst\n          desc: The destination file.\n          value: $(args.dst)\n          defaultValue: file.yaml\n    ",
    ["observations"]: "\n      - Please, see 'var' too.\n    "
  },
  ["var"]: {
    ["desc"]: "Creates a variable datum in the dataset, accessible with $(name) in the catalog.",
    ["def"]: "\n      - var: var name\n        desc: brief description\n        value: the value to set\n        defaultValue: the value to set if value is undefined\n        dataType: the data type (any, bool, text, num or list)\n        options: [the, possible, values]\n    ",
    ["observations"]: "\n      - When dataType is bool, if the value is text ('y', 'yes', 't' or 'true').\n        this is casted to true implicitly.\n      \n      - When dataType is bool, if the value is text ('n', 'no', 'f' or 'false'),\n        this is casted to false implicitly.\n      \n      - When dataType is num, if the value is a text,\n        this is parsed to number implicitly.\n      \n      - The value can access to previous data defined using $(datumName)\n        such as, for example:\n\n          value: /my/file.$(args.ext)\n    "
  },
  ["const"]: {
    ["desc"]: "Creates a constant datum into the dataset, accessible with $(name) in the catalog.",
    ["observations"]: "\n      - Similar to var but using the 'const' field instead of 'var'.\n    "
  },
  ["questions"]: {
    ["desc"]: "How to create questions.",
    ["def"]: "\n      # confirm something\n      - confirm: answerName\n        title: text to show to the user\n        defaultValue: true or false\n      \n      # input from the user\n      - input: answerName\n        title: text to show to the user\n        defaultValue: value to set if no input\n      \n      # password input from the user\n      - password: answerName\n        title: text to show to the user\n        defaultValue: value to set if no input\n      \n      # select from several options\n      - select: answerName\n        title: text to show to the user\n        options: [option1, option2, option3...]\n        multiple: true or false, indicating if several options can be selected\n        selected: default selection\n        defaultValue: alias for selected\n    ",
    ["examples"]: "\n      spec: v1.0\n      desc: Catalog for working with Visual Studio Code.\n\n      dataset:\n        - const: src\n          desc: The source code of this catalog.\n          value: $(__dir)/__vscode\n          tags: [hidden]\n        \n        - const: dst\n          desc: The local destination dir where to save the files and dirs.\n          value: $(workDir)\n        \n        - const: settingsQ\n          tags: [hidden, questions]\n          value:\n            - input: lang\n              title: cSpell.language (for example, es, en, fr, it...)\n              defaultValue: en\n\n            - confirm: prettier\n              title: Would you like to configure Prettier for TypeScript\n              defaultValue: true\n\n      jobs:\n        - macro: settings\n          desc: Creates the .vscode/settings.\n          ini:\n            - quiet: $answers = inquire $(settingsQ) $(answers)\n          steps:\n            - fs.createDir $(dst)/.vscode\n            - quiet: $item = cr.getItem $(src)/_vscode/settings.json\n            - quiet: $settings = hbs.render $(item.value) $(answers)\n            - file.write $(settings) $(dst)/.vscode/settings.json\n    ",
    ["observations"]: "\n      - The questions must be created in a const datum.\n        This must have the questions tag and optionally hidden if wanted.\n      \n      - The questions are performed with the inquire plugin.\n        Example:\n          - quiet: $answers = inquire $(myQ) $(answers)\n      \n      - We list the questions defined in a catalog with the command questions (q).\n\n      - We can pass the value for the questions with the options -a, --arg or --args.\n        Show the help of the 'run' command.\n    "
  }
};
const $DescCommand = class DescCommand extends Command {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['name'] != null) (0, _core.expect)('name', _['name'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'name', {
      value: (0, _core.coalesce)(_['name'], ["describe <thing>", "desc"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "Describe a thing on akro such as, for example, an operation."),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['options'] != null) (0, _core.expect)('options', _['options'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'options', {
      value: (0, _core.coalesce)(_['options'], {}),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['positionals'] != null) (0, _core.expect)('positionals', _['positionals'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'positionals', {
      value: (0, _core.coalesce)(_['positionals'], {
        ["thing"]: {
          ["choices"]: (0, _core.keys)(things),
          ["desc"]: "Thing to describe."
        }
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_fea9a9a433505d9c9114a3626abc6926___init__ instanceof Function) this._pvt_fea9a9a433505d9c9114a3626abc6926___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_fea9a9a433505d9c9114a3626abc6926___post__ instanceof Function) this._pvt_fea9a9a433505d9c9114a3626abc6926___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_fea9a9a433505d9c9114a3626abc6926___validate__ instanceof Function) this._pvt_fea9a9a433505d9c9114a3626abc6926___validate__(); /* c8 ignore stop */
  }
};

const DescCommand = new Proxy($DescCommand, {
  apply(receiver, self, args) {
    return new $DescCommand(...args);
  }
});
module.exports = exports = DescCommand;
DescCommand.prototype.handle = async function (argv) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("argv", argv, _core.map);
  let {
    thing
  } = argv;
  {
    {
      const desc = _core.dogma.getItem(things, thing);
      if (desc) {
        (0, _core.print)("Name:", thing);
        (0, _core.print)("Description:", desc.desc);
        if (desc.def) {
          (0, _core.print)("Definition:");
          (0, _core.print)(desc.def);
        }
        if (desc.observations) {
          (0, _core.print)("Observations:");
          (0, _core.print)(desc.observations);
        }
        if (desc.examples) {
          (0, _core.print)("Examples:");
          (0, _core.print)(desc.examples);
        }
      }
    }
  }
};