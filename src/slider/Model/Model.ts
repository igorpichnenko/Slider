import {
  IOptions,
} from '../interfaces/interfaces';
import {
  EventEmitter,
} from '../EventEmitter/EventEmitter';

class Model {
  public state: IOptions;

  public emitter: EventEmitter;

  constructor(Options: IOptions) {
    this.emitter = new EventEmitter();

    this.state = this.init(Options);
  }

  public setData(Options: IOptions): void {
    const validateFromTo: IOptions = this.validateFromTo(Options);
    const validateMinMaxStep: IOptions = this.validateMinMaxStep(Options);

    this.state = {
      ...Options,
      ...validateFromTo,
      ...validateMinMaxStep,
    };

    this.emitter.emit('newData', this.state);
  }

  private init(Options: IOptions): IOptions {
    this.setData(Options);
    return this.state;
  }

  private validateMinMaxStep(Options: IOptions): IOptions {
    const {
      min,
      max,
      step,
    } = Options;

    if (step <= 0) Options.step = 0.1;

    const isMaxMin = max <= min && max < 0;
    const isMinMax = (min >= max && max > 0) || (max < 0 && max < min);

    if (isMaxMin) {
      Options.min = min - step;
    }

    if (isMinMax) {
      Options.min = min;
      Options.max = min + step;
    }

    return Options;
  }

  private validateFromTo(Options: IOptions): IOptions {
    const {
      from,
      to,
      max,
      min,
      step, isDouble,
    } = Options;

    if (isDouble) {
      Options.to = max;
    }

    const maxMinZero = max < 0 && min === 0;
    const isMinMaxZero = min < 0 && max < 0;
    const isSingleFrom = !isDouble && from >= to;
    const isCorrectFrom = from > 0 && isMinMaxZero;

    if (from > max) Options.from = max - step;

    if (from < min) Options.from = min;
    if (to > max) Options.to = max;

    if (maxMinZero) {
      Options.from = min;
      Options.to = min;
    }
    if (isSingleFrom) {
      Options.from = to - step;
    }
    if (isCorrectFrom) {
      Options.from = min;
    }

    if (to <= min) {
      Options.to = min + step;
      Options.from = min;
    }

    if (max < min) {
      Options.to = min + step;
    }
    return Options;
  }
}

export {
  Model,
};
