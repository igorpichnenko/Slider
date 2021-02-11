import { Model } from './Model'
import { View } from './View'
import { Options } from './interfaces'
import { Observable } from './Observable'
import { standardOptions } from './standardOptions'

class Presenter {
  
  public observable: Observable;
  private view: View;
  private model: Model;
  
  constructor(options: Options){
    this.observable = new Observable();
    this.model = this.createModel(options);
    this.view = this.createView(this.model.state);
    this.bindSubscribtions()
  }
  
  private createModel(options: Options): Model {
    return new Model(options);
  }

  private createView(options: Options): View {
    return new View(options);
  }
  
  private bindSubscribtions(): void {
    this.getDataToView = this.getDataToView.bind(this)
    this.sendDataToModel = this.sendDataToModel.bind(this)
    
    this.addSubscribtions()
  }
  
  private addSubscribtions(): void {
    this.model.observable.getData('newModeldata', this.getDataToView);
    this.view.observable.getData('newPositions', this.sendDataToModel);
  }
  
  private getDataToView(modelData: Options): void {
    
    this.view.setState(modelData);
    this.observable.sendData('newModeldata', modelData);
  }

  private sendDataToModel(newPositions: Partial<Options>): void {
   
    const modelState: Options = this.model.state;
    const newModelData: Options = { ...modelState, ...newPositions };
    this.model.setState(newModelData);
  }
  
  
  public setOptions(options: Partial<Options>): void {
    const newOptions: Options = { ...standardOptions, ...options };
    this.model.setState(newOptions);
  }

  public getOptions(): Options {
    return this.model.state;
  }
  
}

export { Presenter }