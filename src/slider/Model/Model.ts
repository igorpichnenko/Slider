import { Options } from '../interfaces/interfaces';
import { EventEmitter } from '../EventEmitter/EventEmitter';

class Model {
  public state: Options;

  public emitter: EventEmitter;

  constructor(options: Options) {
    this.emitter = new EventEmitter();

    this.state = this.init(options);
  }

  public setData(options: Options): void {
    const validateFromTo: Options = this.validateFromTo(options);
    const validateMinMaxStep: Options = this.validateMinMaxStep(options);

    this.state = { ...options, ...validateFromTo, ...validateMinMaxStep };

    this.emitter.emit('newData', this.state);
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
}

export { Model };
