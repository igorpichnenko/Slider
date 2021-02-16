import { Presenter } from './Presenter';
import { Options } from './interfaces';
import { demoTemplate } from './demoTemplate';



class Demo {
  public state: Options;

  private demoTools: HTMLElement;

  constructor(private slider: Presenter) {
    this.state = slider.getOptions();
    this.demoTools = this.createTools();
    this.init();
  }

  public update(newSetting: Partial<Options>) {
    this.state = { ...this.state, ...newSetting };
    this.initTools();
  }

  private init() {
    this.createSettings();
    this.initTools();
    
    this.update = this.update.bind(this)
    
    this.slider.observable.subscribe('newModelState', this.update);
  }

  private createTools(): HTMLElement{
 const demoTools = document.querySelector('.wrap')! as HTMLElement
    
    return demoTools;
  }

  private createSettings() {
    this.demoTools.insertAdjacentHTML('beforeend', demoTemplate);
  }

  

  private initTools() {
    const { orientation } = this.state
    
    
    let checkbox = document.querySelector('.orientation')! as HTMLElement
     checkbox.onchange = () =>{
    
    if( orientation === "horizontal"){
     
    
    this.setState({orientation: "vertical"})
    this.slider.upDateView()
    }
      if( orientation === "vertical"){

    this.setState({orientation: "horizontal"})
   this.slider.upDateView()
    }
    
  }
    
  }

 

  private setState(newOptions: Partial<Options>) {
    this.state = { ...this.state, ...newOptions };
    this.slider.setOptions(this.state);
  }
}

export { Demo };