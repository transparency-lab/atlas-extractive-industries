"use strict";

var _imagemin = _interopRequireDefault(require("imagemin"));

var _normalizeConfig = _interopRequireDefault(require("./utils/normalize-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function minify(options = {}) {
  const {
    input,
    filename,
    severityError,
    isProductionMode
  } = options;
  const result = {
    input,
    filename,
    warnings: [],
    errors: []
  };

  if (!result.input) {
    result.errors.push(new Error('Empty input'));
    return result;
  }

  result.input = input;
  let output;
  let minimizerOptions;

  try {
    // Implement autosearch config on root directory of project in future
    minimizerOptions = (0, _normalizeConfig.default)(options.minimizerOptions, {
      options,
      result
    });
    output = await _imagemin.default.buffer(result.input, minimizerOptions);
  } catch (error) {
    const errored = error instanceof Error ? error : new Error(error);

    switch (severityError) {
      case 'off':
      case false:
        break;

      case 'error':
      case true:
        result.errors.push(errored);
        break;

      case 'warning':
        result.warnings.push(errored);
        break;

      case 'auto':
      default:
        if (isProductionMode) {
          result.errors.push(errored);
        } else {
          result.warnings.push(errored);
        }

    }

    return {
      filename,
      output: input,
      warnings: result.warnings,
      errors: result.errors
    };
  }

  return {
    filename,
    output,
    warnings: result.warnings,
    errors: result.errors
  };
}

module.exports = minify;