import { Options } from './interfaces';
import { Observable } from './Observable';

class Model {
  public state: Options;

  public observable: Observable;

  constructor(options: Options) {
    this.observable = new Observable();

    this.state = this.init(options);
  }

  public setData(options: Options): void {
    const validateOptions: Options = this.validateOptions(options);
    this.state = { ...validateOptions };

    this.observable.notify('newModelState', this.state);
  }

  private init(options: Options): Options {
    this.setData = this.setData.bind(this);
    this.setData(options);
    return this.state;
  }

  private validateOptions(options: Options): Options {
    return options;
  }
}

export { Model };
