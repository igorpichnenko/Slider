import { Options } from './interfaces'
import { Observable } from './Observable'

class Model {
  
  public state: Options;

  public observable: Observable;
  
  constructor(options: Options){
    this.observable = new Observable();
    this.state = this.init(options);
  }
  
  
  private init(options: Options): Options {
    this.setState(options);
    return this.state;
  }
  
  public setState(options: Options): void {
    
    const validateOptions: Options = this.validateOptions(options);
    
    this.state = { ...validateOptions };

    this.observable.sendData('newModeldata', this.state);
  }
  private validateOptions(options: Options): Options {
    
    if (options.to < 0){
      options.to = options.min
    }
    
    
    
    return options
  }
}

export { Model }