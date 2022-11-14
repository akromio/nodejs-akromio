"use strict";

var _core = require("@dogmalang/core");
const fs = _core.dogma.use(require("fs/promises"));
const path = _core.dogma.use(require("path"));
const yaml = _core.dogma.use(require("yaml"));
const Repository = _core.dogma.use(require("../../Repository"));
const $LocalRepository = class LocalRepository extends Repository {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('basePath', _['basePath'], _core.text);
    Object.defineProperty(this, 'basePath', {
      value: (0, _core.coalesce)(_['basePath'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['extensions'] != null) (0, _core.expect)('extensions', _['extensions'], _core.dogma.TypeDef({
      name: 'inline',
      types: [".yaml", ".yml", ".json"],
      min: 0,
      max: null
    })); /* c8 ignore stop */
    Object.defineProperty(this, 'extensions', {
      value: (0, _core.coalesce)(_['extensions'], [".yaml", ".yml", ".json"]),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_fbfcf265602141ef6ee597f5629f81ff___init__ instanceof Function) this._pvt_fbfcf265602141ef6ee597f5629f81ff___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_fbfcf265602141ef6ee597f5629f81ff___post__ instanceof Function) this._pvt_fbfcf265602141ef6ee597f5629f81ff___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_fbfcf265602141ef6ee597f5629f81ff___validate__ instanceof Function) this._pvt_fbfcf265602141ef6ee597f5629f81ff___validate__(); /* c8 ignore stop */
  }
};

const LocalRepository = new Proxy($LocalRepository, {
  apply(receiver, self, args) {
    return new $LocalRepository(...args);
  }
});
module.exports = exports = LocalRepository;
LocalRepository.prototype.getDatum = async function (name) {
  const self = this;
  let datum; /* c8 ignore next */
  _core.dogma.expect("name", name, _core.text);
  {
    for (const ext of this.extensions) {
      const loc = path.join(this.basePath, name + ext);
      {
        const [ok, content] = await _core.dogma.pawait(() => fs.readFile(loc, "utf8"));
        if (ok) {
          {
            const _ = ext;
            switch (_) {
              case ".yaml":
              case ".yml":
                {
                  datum = yaml.parse(content);
                } /* c8 ignore start */
                break;
              /* c8 ignore stop */
              case ".json":
                {
                  datum = _core.json.decode(content);
                } /* c8 ignore start */
                break;
              /* c8 ignore stop */
            }
          }
          break;
        }
      }
    }
  }
  return datum;
};