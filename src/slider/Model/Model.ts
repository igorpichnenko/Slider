import {
  Options,
} from '../interfaces/interfaces';
import {
  EventEmitter,
} from '../EventEmitter/EventEmitter';

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

    this.state = {
      ...options,
      ...validateFromTo,
      ...validateMinMaxStep,
    };

    this.emitter.emit('newData', this.state);
  }

  private init(options: Options): Options {
    this.setData(options);
    return this.state;
  }

  private validateMinMaxStep(options: Options): Options {
    const {
      min,
      max,
      step,
    } = options;

    if (step <= 0) options.step = 0.1;

    const isMaxMin = max <= min && max < 0;
    const isMinMax = (min >= max && max > 0) || (max < 0 && max < min);

    if (isMaxMin) {
      options.min = min - step;
    }

    if (isMinMax) {
      options.min = min;
      options.max = min + step;
    }

    return options;
  }

  private validateFromTo(options: Options): Options {
    const {
      from,
      to,
      max,
      min,
      type,
      step,
    } = options;

    if (type === 'single') {
      options.to = max;
    }

    const maxMinZero = max < 0 && min === 0
    const isMinMaxZero = min < 0 && max < 0
    
    if (from > max) options.from = max - step

    if (from < min) options.from = min;
    if (to > max) options.to = max;

    if (maxMinZero) {
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
      if (isMinMaxZero) {
        options.from = min;
      }
    }
    if (max < min) {
      options.to = min + step;
    }
    return options;
  }
}

export {
  Model,
};
