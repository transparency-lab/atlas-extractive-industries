"use strict";

var _path = _interopRequireDefault(require("path"));

var _minify = _interopRequireDefault(require("./minify"));

var _interpolateName = _interopRequireDefault(require("./utils/interpolate-name"));

var _loaderOptions = _interopRequireDefault(require("./loader-options.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = async function loader(content) {
  const options = this.getOptions(_loaderOptions.default);
  const callback = this.async();

  const name = _path.default.relative(this.rootContext, this.resourcePath);

  if (options.filter && !options.filter(content, name)) {
    callback(null, content);
    return;
  }

  const input = content;
  const {
    severityError,
    minimizerOptions
  } = options;
  const minifyOptions = {
    input,
    filename: name,
    severityError,
    minimizerOptions,
    isProductionMode: this.mode === 'production' || !this.mode
  };
  const output = await (0, _minify.default)(minifyOptions);

  if (output.errors && output.errors.length > 0) {
    output.errors.forEach(warning => {
      this.emitError(warning);
    });
    callback(null, content);
    return;
  }

  output.source = output.output;

  if (output.warnings && output.warnings.length > 0) {
    output.warnings.forEach(warning => {
      this.emitWarning(warning);
    });
  }

  const {
    source
  } = output;
  const newName = (0, _interpolateName.default)(name, options.filename || '[path][name][ext]');
  const isNewAsset = name !== newName;

  if (isNewAsset) {
    this.emitFile(newName, source, null, {
      minimized: true
    });

    if (options.deleteOriginalAssets) {// TODO remove original asset
    }

    callback(null, content);
    return;
  }

  callback(null, source);
};

module.exports.raw = true;