"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function interpolateName(name, filename) {
  const match = /^([^?#]*)(\?[^#]*)?(#.*)?$/.exec(name);
  const [, replacerFile] = match;
  const replacerQuery = match[2] || '';
  const replacerFragment = match[3] || '';

  const replacerExt = _path.default.extname(replacerFile);

  const replacerBase = _path.default.basename(replacerFile);

  const replacerName = replacerBase.slice(0, replacerBase.length - replacerExt.length);
  const replacerPath = replacerFile.slice(0, replacerFile.length - replacerBase.length);
  const pathData = {
    file: replacerFile,
    query: replacerQuery,
    fragment: replacerFragment,
    path: replacerPath,
    base: replacerBase,
    name: replacerName,
    ext: replacerExt || ''
  };
  let newName = filename;

  if (typeof newName === 'function') {
    newName = newName(pathData);
  }

  return newName.replace(/\[(file|query|fragment|path|base|name|ext)]/g, (p0, p1) => pathData[p1]);
}

var _default = interpolateName;
exports.default = _default;