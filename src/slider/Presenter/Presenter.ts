import { Model } from '../Model/Model';
import { View } from '../View/View';
import { IOptions } from '../interfaces/interfaces';
import { EventEmitter } from '../EventEmitter/EventEmitter';
import { standardOptions } from '../interfaces/standardOptions';

class Presenter {
  public emitter: EventEmitter;

  public view: View;

  public model: Model;

  constructor(options: IOptions, public element: JQuery<HTMLElement>) {
    this.emitter = new EventEmitter();

    this.model = this.createModel(options);
    this.view = this.createView(this.model.state, element);
    this.bindSubscribe();
  }

  public upDataView() {
    this.view.upDataSlider();
  }

  public setOptions(options: Partial<IOptions>): void {
    const newOptions: IOptions = { ...standardOptions, ...options };
    this.model.setData(newOptions);
  }

  public getOptions(): IOptions {
    return this.model.state;
  }

  public createModel(options: IOptions): Model {
    return new Model(options);
  }

  public createView(options: IOptions, element: JQuery<HTMLElement>): View {
    return new View(options, element);
  }

  private bindSubscribe(): void {
    this.getNewData = this.getNewData.bind(this);
    this.sendNewPosition = this.sendNewPosition.bind(this);
    this.addSubscribtions();
  }

  private addSubscribtions(): void {
    this.model.emitter.subscribe('newData', this.getNewData);
    this.view.emitter.subscribe('newPosition', this.sendNewPosition);
  }

  private getNewData(newData: IOptions): void {
    this.view.upData(newData);
    this.emitter.emit('newData', newData);
  }

  private sendNewPosition(newPosition: Partial<IOptions>): void {
    const modelState: IOptions = this.model.state;
    const newData: IOptions = { ...modelState, ...newPosition };
    this.model.setData(newData);
  }
}

export { Presenter };
