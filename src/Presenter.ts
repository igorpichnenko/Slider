import { Model } from './Model';
import { View } from './View';
import { Options } from './interfaces';
import { Observable } from './Observable';
import { standardOptions } from './standardOptions';

class Presenter {
  public observable: Observable;

  public view: View;

  public model: Model;

  constructor(options: Options, element: HTMLElement) {
    this.observable = new Observable();
    this.model = this.createModel(options);
    this.view = this.createView(this.model.state, element);
    this.bindSubscribe();
  }

  public upDateView() {
    this.view.upDateSlider();
  }

  public setOptions(options: Partial<Options>): void {
    const newOptions: Options = { ...standardOptions, ...options };
    this.model.setData(newOptions);
  }

  public getOptions(): Options {
    return this.model.state;
  }

  public createModel(options: Options): Model {
    return new Model(options);
  }

  public createView(options: Options, element: HTMLElement): View {
    return new View(options, element);
  }

  private bindSubscribe(): void {
    this.getNewData = this.getNewData.bind(this);
    this.sendNewPosition = this.sendNewPosition.bind(this);
    this.addSubscribtions();
  }

  private addSubscribtions(): void {
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
