import {
  IOptions,
} from '../interfaces/interfaces';
import {
  EventEmitter,
} from '../EventEmitter/EventEmitter';

class Model {
  public state: IOptions;

  public emitter: EventEmitter;

  constructor(IOptions: IOptions) {
    this.emitter = new EventEmitter();

    this.state = this.init(IOptions);
  }

  public setData(IOptions: IOptions): void {
    const validateFromTo: IOptions = this.validateFromTo(IOptions);
    const validateMinMaxStep: IOptions = this.validateMinMaxStep(IOptions);

    this.state = {
      ...IOptions,
      ...validateFromTo,
      ...validateMinMaxStep,
    };

    this.emitter.emit('newData', this.state);
  }

  private init(IOptions: IOptions): IOptions {
    this.setData(IOptions);
    return this.state;
  }

  private validateMinMaxStep(IOptions: IOptions): IOptions {
    const {
      min,
      max,
      step,
    } = IOptions;

    if (step <= 0) IOptions.step = 0.1;

    const isMaxMin = max <= min && max < 0;
    const isMinMax = (min >= max && max > 0) || (max < 0 && max < min);

    if (isMaxMin) {
      IOptions.min = min - step;
    }

    if (isMinMax) {
      IOptions.min = min;
      IOptions.max = min + step;
    }

    return IOptions;
  }

  private validateFromTo(IOptions: IOptions): IOptions {
    const {
      from,
      to,
      max,
      min,
      type,
      step,
    } = IOptions;

    if (type === 'single') {
      IOptions.to = max;
    }

    const maxMinZero = max < 0 && min === 0;
    const isMinMaxZero = min < 0 && max < 0;

    if (from > max) IOptions.from = max - step;

    if (from < min) IOptions.from = min;
    if (to > max) IOptions.to = max;

    if (maxMinZero) {
      IOptions.from = min;
      IOptions.to = min;
    }

    if (type === 'double') {
      if (from >= to) {
        IOptions.from = to - step;
      }
    }

    if (to <= min) {
      IOptions.to = min + step;
      IOptions.from = min;
    }

    if (from > 0) {
      if (isMinMaxZero) {
        IOptions.from = min;
      }
    }
    if (max < min) {
      IOptions.to = min + step;
    }
    return IOptions;
  }
}

export {
  Model,
};
