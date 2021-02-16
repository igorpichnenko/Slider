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
    let {
      orientation, isScale, type, isLabel,from, to, min, max, marker, step
    } = this.state;
    
    
    const isOrientation = document.querySelector('.js-orientation')! as HTMLElement;
    const changeScale = document.querySelector('.js-isScale')! as HTMLElement;
    const label = document.querySelector('.js-isLabel')! as HTMLElement;
    const isDouble = document.querySelector('.js-isDouble')! as HTMLElement;
    const inputFrom = document.querySelector('.js-from')! as HTMLInputElement
    const inputTo = document.querySelector('.js-to')! as HTMLInputElement
    const inputMin = document.querySelector('.js-min')! as HTMLInputElement
    const inputMax = document.querySelector('.js-max')! as HTMLInputElement
    let inputMarker = document.querySelector('.js-marker')! as HTMLInputElement
    let inputStep = document.querySelector('.js-step')! as HTMLInputElement

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

    
    changeScale.onchange = () => {
      if (isScale === false) {
        this.setState({ isScale: true });
      } else {
        this.setState({ isScale: false });
      }
    };

    
    label.onchange = () => {
      if (isLabel === true) {
        this.setState({ isLabel: false });
      } if (isLabel === false) {
        this.setState({ isLabel: true });
      }
    };

    
    isDouble.onchange = () => {
      if (type === 'single') {
        this.setState({ type: 'double' });
      } else {
        this.setState({ type: 'single' });
      }
    };
    
    inputMarker.value = marker

   inputMarker.onchange = () =>{
     
     let value = inputMarker.value
     
     this.setState({ marker: value });
 
   }
   
    inputFrom.value = String(from)
    
    inputFrom.onchange = () =>{
    let value = parseInt(inputFrom.value)
    
    this.setState({ from: value });
  }
  
    inputTo.value = String(to)
    
    inputTo.onchange = () =>{
    let value = parseInt(inputTo.value)
    
    this.setState({ to: value });
  }
    
    inputMin.value = String(min)
    
    inputMin.onchange = () =>{
    let value = parseInt(inputMin.value)
    
    this.setState({ min: value });
  }
  
    inputMax.value = String(max)
    
    inputMax.onchange = () =>{
    let value = parseInt(inputMax.value)
    console.log(value)
    this.setState({ max: value });
    this.slider.upDateView();
  }
    inputStep.value = String(step)
    
    inputStep.onchange = () =>{
    let value = parseInt(inputStep.value)
    
    this.setState({ step: value });
    this.slider.upDateView();
  }
  }

  private setState(newOptions: Partial<Options>) {
    this.state = { ...this.state, ...newOptions };
    this.slider.setOptions(this.state);
  }
}

export { Demo };
