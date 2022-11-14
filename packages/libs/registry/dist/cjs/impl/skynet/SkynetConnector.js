"use strict";

var _core = require("@dogmalang/core");
const mime = _core.dogma.use(require("mime-types"));
const os = _core.dogma.use(require("os"));
const path = _core.dogma.use(require("path"));
const zip = _core.dogma.use(require("node-stream-zip"));
const fsx = _core.dogma.use(require("fs-extra"));
const fs = _core.dogma.use(require("fs/promises"));
const {
  fromFile: determineFileType
} = _core.dogma.use(require("file-type"));
const InternalSkynetConnector = _core.dogma.use(require("../InternalSkynetConnector"));
const $SkynetConnector = class SkynetConnector extends InternalSkynetConnector {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('skylink', _['skylink'], _core.text);
    Object.defineProperty(this, 'skylink', {
      value: (0, _core.coalesce)(_['skylink'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'fs', {
      value: (0, _core.coalesce)(_['fs'], fs),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_5af8b1be2d29f2977d29f2e2121af21c___init__ instanceof Function) this._pvt_5af8b1be2d29f2977d29f2e2121af21c___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_5af8b1be2d29f2977d29f2e2121af21c___post__ instanceof Function) this._pvt_5af8b1be2d29f2977d29f2e2121af21c___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_5af8b1be2d29f2977d29f2e2121af21c___validate__ instanceof Function) this._pvt_5af8b1be2d29f2977d29f2e2121af21c___validate__(); /* c8 ignore stop */
  }
};

const SkynetConnector = new Proxy($SkynetConnector, {
  apply(receiver, self, args) {
    return new $SkynetConnector(...args);
  }
});
module.exports = exports = SkynetConnector;
SkynetConnector.prototype.downloadItem = async function (itemPath, localPath, opts) {
  const self = this;
  let downloaded = false; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text); /* c8 ignore next */
  _core.dogma.expect("localPath", localPath, _core.text); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.dogma.intf("inline", {
    unzip: {
      optional: true,
      type: _core.bool
    },
    overwrite: {
      optional: true,
      type: _core.bool
    }
  }));
  let {
    unzip,
    overwrite
  } = opts || {};
  {
    if (_core.dogma.getItem(await _core.dogma.pawait(() => fs.access(localPath)), 0)) {
      if (!overwrite) {
        _core.dogma.raise(Error(`The local path already exists: ${localPath}.`));
      }
      0, await fsx.remove(localPath);
    }
    0, await fsx.ensureDir(path.dirname(localPath));
    const skynet = this.client;
    const skylink = path.join(this.skylink, itemPath);
    [downloaded] = await _core.dogma.pawait(() => skynet.downloadFile(localPath, skylink));
    if (downloaded && unzip) {
      if (((0, await determineFileType(localPath)) != null ? (0, await determineFileType(localPath)).mime : null) == "application/zip") {
        0, await unzipFile(localPath, itemPath);
      }
    }
  }
  return downloaded;
};
async function unzipFile(localPath, pathToExtract) {
  /* c8 ignore next */_core.dogma.expect("localPath", localPath, _core.text); /* c8 ignore next */
  _core.dogma.expect("pathToExtract", pathToExtract, _core.text);
  {
    const zippedFilePath = localPath + ".zip";
    0, await fs.rename(localPath, zippedFilePath);
    const unzip = new zip.async({
      file: zippedFilePath
    });
    0, await fsx.ensureDir(localPath);
    0, await unzip.extract(_core.dogma.getSlice(pathToExtract, 1, -1), localPath);
    await _core.dogma.pawait(() => fsx.remove(zippedFilePath));
  }
}