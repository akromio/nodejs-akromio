"use strict";

var _core = require("@dogmalang/core");
const mime = _core.dogma.use(require("mime-types"));
const path = _core.dogma.use(require("path"));
const {
  SkynetClient,
  uriSkynetPrefix
} = _core.dogma.use(require("@skynetlabs/skynet-nodejs"));
const InternalConnector = _core.dogma.use(require("./InternalConnector"));
const $InternalSkynetConnector = class InternalSkynetConnector extends InternalConnector {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('client', _['client'], SkynetClient);
    Object.defineProperty(this, 'client', {
      value: (0, _core.coalesce)(_['client'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_94460ddfce4bf10edcc01dca5854a52a___init__ instanceof Function) this._pvt_94460ddfce4bf10edcc01dca5854a52a___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_94460ddfce4bf10edcc01dca5854a52a___post__ instanceof Function) this._pvt_94460ddfce4bf10edcc01dca5854a52a___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_94460ddfce4bf10edcc01dca5854a52a___validate__ instanceof Function) this._pvt_94460ddfce4bf10edcc01dca5854a52a___validate__(); /* c8 ignore stop */
  }
};

const InternalSkynetConnector = new Proxy($InternalSkynetConnector, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'InternalSkynetConnector' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = InternalSkynetConnector;
InternalSkynetConnector.prototype._getItem = async function (itemPath) {
  const self = this;
  let item; /* c8 ignore next */
  _core.dogma.expect("itemPath", itemPath, _core.text);
  {
    const skynetPrefix = _core.dogma.getSlice(uriSkynetPrefix, 0, uriSkynetPrefix.indexOf("/"));
    const skynetPrefixPattern = (0, _core.re)("^" + skynetPrefix);
    const skylink = path.join(this.skylink, itemPath).replace(skynetPrefixPattern, "");
    const skynet = this.client;
    {
      const [ok, aux] = await _core.dogma.pawait(() => skynet.downloadData(skylink));
      if (ok) {
        item = {
          ["name"]: itemPath,
          ["cty"]: mime.lookup(itemPath) || "application/octet-stream",
          ["value"]: aux
        };
      }
    }
  }
  return item;
};
InternalSkynetConnector.prototype.listItems = async function (dirPath) {
  const self = this;
  let items = []; /* c8 ignore next */
  _core.dogma.expect("dirPath", dirPath, _core.text);
  {
    const skynet = this.client;
    const {
      metadata
    } = (0, await skynet.getMetadata(this.skylink));
    const dirRelativePath = _core.dogma.getSlice(dirPath, 1, -1);
    for (let entry of (0, _core.values)(metadata.subfiles)) {
      {
        const ep = entry.filename.replace(dirRelativePath, "");
        if (!ep.includes("/")) {
          items.push(ep);
        }
      }
    }
  }
  return items;
};