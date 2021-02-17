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

    this.state = { ...validateOptions };
    this.state = { ...validateFromTo };
    this.state = { ...validateMinMaxStep };

    this.observable.notify('newModelState', this.state);
  }

  private init(options: Options): Options {
    this.setData = this.setData.bind(this);
    this.setData(options);
    return this.state;
  }

  private validateMinMaxStep(options: Options): Options {
    const { min, max, step } = options;

    if (step < 1) options.step = 1;
    // временое решение ограничить максимальный шаг
    
    if (min > max) options.min = max
      const maxStep = max  / 2;

    if (step > maxStep) options.step = maxStep;
    return options;
  }

  private validateFromTo(options: Options): Options {
    const {
      from, to, max, min, type,
    } = options;
    if (type === 'single') {
      options.to = max;
    }

    if (min > from) options.from = min;
    if (to > max) options.to = max;
    if (from > max) options.from = max;
    if (from > to) options.from = to;
    if (to < min) {
      options.to = min;
      options.from = min;
    }
   if (min > max){
     options.from = max
     options.to = max
   }
    return options;
  }

  private validateOptions(options: Options): Options {
    const {
      selector, orientation, type, min, max, step, from, to, marker, isLabel, isScale, color,
    } = options;

    if (marker === undefined) options.marker = standardOptions.marker;

    if (to === undefined) options.to = standardOptions.to;

    if (from === undefined) options.from = standardOptions.from;

    if (min === undefined) options.min = standardOptions.min;

    if (max === undefined) options.max = standardOptions.max;

    if (step === undefined) options.step = standardOptions.step;

    if (type === undefined) options.type = standardOptions.type;

    if (orientation === undefined) options.orientation = standardOptions.orientation;

    if (selector === undefined) options.selector = standardOptions.selector;

    if (isScale === undefined) options.isScale = standardOptions.isScale;

    if (isLabel === undefined) options.isLabel = standardOptions.isLabel;

    if (color === undefined) options.color = standardOptions.color;

    return options;
  }
}

export { Model };
