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

    this.update = this.update.bind(this);

    this.slider.observable.subscribe('newModelState', this.update);
  }

  private createTools(): HTMLElement {
    const demoTools = document.querySelector('.wrap')! as HTMLElement;

    return demoTools;
  }

  private createSettings() {
    this.demoTools.insertAdjacentHTML('beforeend', demoTemplate);
  }

  private initTools() {
    const { orientation, isScale, type } = this.state;

    const isOrientation = document.querySelector('.js-orientation')! as HTMLElement;
    
    isOrientation.onchange = () => {
      if (orientation === 'horizontal') {
        this.setState({ orientation: 'vertical' });
        this.slider.upDateView();
      }
      if (orientation === 'vertical') {
        this.setState({ orientation: 'horizontal' });
        this.slider.upDateView();
      }
    };
    /*
    const changeScale = document.querySelector('.js-isScale')! as HTMLElement
    changeScale.onchange = () => {
      if (isScale === false){
        this.setState({ isScale: true });
      }else {
        this.setState({ isScale: false });
      }
      
    }
    const isDouble = document.querySelector('.js-isDouble')! as HTMLElement
    if (type === "single"){
      this.setState({ type: "double" });
    }else{
       this.setState({ type: "single" });
    }*/
  }

  private setState(newOptions: Partial<Options>) {
    this.state = { ...this.state, ...newOptions };
    this.slider.setOptions(this.state);
  }
}

export { Demo };
