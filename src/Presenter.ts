import { Model } from './Model';
import { View } from './View';
import { Options } from './interfaces';
import { Observable } from './Observable';
import { standardOptions } from './standardOptions';
import { Demo } from './Demo';

class Presenter {
  public observable: Observable;

  private view: View;

  private demo: Demo;

  private model: Model;

  constructor(options: Options) {
    this.observable = new Observable();
    this.model = this.createModel(options);
    this.view = this.createView(this.model.state);
    this.demo = this.createDemo();
    this.addSubscribtions();
  }

  public upDateView() {
    this.view.upDateSlider();
  }

  private createDemo() {
    return new Demo(this);
  }

  public setOptions(options: Partial<Options>): void {
    const newOptions: Options = { ...standardOptions, ...options };
    this.model.setData(newOptions);
  }

  public getOptions(): Options {
    return this.model.state;
  }

  private createModel(options: Options): Model {
    return new Model(options);
  }

  private createView(options: Options): View {
    return new View(options);
  }

  private addSubscribtions(): void {
    this.getNewData = this.getNewData.bind(this);

    this.sendNewPosition = this.sendNewPosition.bind(this);

    this.model.observable.subscribe('newData', this.getNewData);
    this.view.observable.subscribe('newPosition', this.sendNewPosition);
  }

  private getNewData(newData: Options): void {
    this.view.upData(newData);
    this.observable.notify('newData', newData);
  }

  private sendNewPosition(newPosition: Partial<Options>): void {
    const modelState: Options = this.model.state;
    const newData: Options = { ...modelState, ...newPosition };
    this.model.setData(newData);
  }
}

export { Presenter };
