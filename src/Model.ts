import { Options } from './interfaces';
import { Observable } from './Observable';
import { standardOptions } from './standardOptions';

class Model {
  public state: Options;

  public observable: Observable;

  constructor(options: Options) {
    this.observable = new Observable();

    this.state = this.init(options);
  }

  public setData(options: Options): void {
    const validateOptions: Options = this.validateOptions(options);
    const validateFromTo: Options = this.validateFromTo(options);
    const validateMinMaxStep: Options = this.validateMinMaxStep(options);

    this.state = { ...validateOptions, ...validateFromTo, ...validateMinMaxStep };

    this.observable.notify('newData', this.state);
  }

  private init(options: Options): Options {
    this.setData(options);
    return this.state;
  }

  private validateMinMaxStep(options: Options): Options {
    const { min, max, step } = options;

    if (step < 1) options.step = 1;

    const maxStep = Math.abs(max) / 2;

    if (step > maxStep) options.step = maxStep;

    if (max <= min && max < 0) {
      options.min = min - step;
    }

    if (min >= max && max > 0) {
      options.min = min;
      options.max = min + step;
    }

    if (max < 0 && max < min) {
      options.max = min + step;
      options.min = min;
    }
    return options;
  }

  private validateFromTo(options: Options): Options {
    const {
      from, to, max, min, type, step,
    } = options;
    if (type === 'single') {
      options.to = max;
    }

    if (min > from) options.from = min;
    if (to > max) options.to = max;

    if (max < 0 && min === 0) {
      options.from = min;
      options.to = min;
    }

    if (type === 'double') {
      if (from >= to) {
        options.from = to - step;
      }
    }

    if (to <= min) {
      options.to = min + step;
      options.from = min;
    }

    if (from > 0) {
      if (min < 0 && max < 0) {
        options.from = min;
      }
    }
    if (max < min) {
      options.to = min + step;
    }
    return options;
  }

  private validateOptions(options: Options): Options {
    const {
      orientation, type, min, max, step, from, to, prefix, isLabel,
      isScale, color, isScalePrefix, scalePrefix,
    } = options;

    if (isScalePrefix === undefined) options.isScalePrefix = standardOptions.isScalePrefix;

    if (scalePrefix === undefined) options.scalePrefix = standardOptions.scalePrefix;

    if (prefix === undefined) options.prefix = standardOptions.prefix;

    if (to === undefined) options.to = standardOptions.to;

    if (from === undefined) options.from = standardOptions.from;

    if (min === undefined) options.min = standardOptions.min;

    if (max === undefined) options.max = standardOptions.max;

    if (step === undefined) options.step = standardOptions.step;

    if (type === undefined) options.type = standardOptions.type;

    if (orientation === undefined) options.orientation = standardOptions.orientation;

    if (isScale === undefined) options.isScale = standardOptions.isScale;

    if (isLabel === undefined) options.isLabel = standardOptions.isLabel;

    if (color === undefined) options.color = standardOptions.color;

    return options;
  }
}

export { Model };
