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
    const demoTools = document.createElement('div');
    demoTools.className = 'demoTools';
    return demoTools;
  }

  private createSettings() {
    const { selector } = this.state;

    const slider = document.querySelector(selector)! as HTMLElement;
    slider.after(this.demoTools);
    this.demoTools.insertAdjacentHTML('beforeend', demoTemplate);
  }

  private initTools() {
    const {
      orientation, isScale, type, isLabel, from, to, min, max, prefix, step,
      color, isScalePrefix, scalePrefix,
    } = this.state;

    const isOrientation = this.demoTools.querySelector('.js-orientation')! as HTMLElement;
    const changeScale = this.demoTools.querySelector('.js-isScale')! as HTMLElement;
    const label = this.demoTools.querySelector('.js-isLabel')! as HTMLElement;
    const isDouble = this.demoTools.querySelector('.js-isDouble')! as HTMLElement;
    const inputFrom = this.demoTools.querySelector('.js-from')! as HTMLInputElement;
    const inputTo = this.demoTools.querySelector('.js-to')! as HTMLInputElement;
    const inputMin = this.demoTools.querySelector('.js-min')! as HTMLInputElement;
    const inputMax = this.demoTools.querySelector('.js-max')! as HTMLInputElement;
    const inputMarker = this.demoTools.querySelector('.js-marker')! as HTMLInputElement;
    const inputStep = this.demoTools.querySelector('.js-step')! as HTMLInputElement;
    const inputColor = this.demoTools.querySelector('.js-color')! as HTMLInputElement;
    const inputIsPrefix = this.demoTools.querySelector('.js-isPrefix')! as HTMLInputElement;
    const inputScalePrefix = this.demoTools.querySelector('.js-scale-prifix')! as HTMLInputElement;

    isOrientation.onchange = () => {
      if (orientation === 'horizontal') {
        this.setState({ orientation: 'vertical' });
      }
      if (orientation === 'vertical') {
        this.setState({ orientation: 'horizontal' });
      }
    };
    inputIsPrefix.onchange = () => {
      if (isScalePrefix === true) {
        this.setState({ isScalePrefix: false });
      }
      if (isScalePrefix === false) {
        this.setState({ isScalePrefix: true });
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

    inputMarker.value = prefix;

    inputMarker.onchange = () => {
      const { value } = inputMarker;
      this.setState({ prefix: value });
    };

    inputFrom.value = String(from);

    inputFrom.onchange = () => {
      const value = Number(inputFrom.value);
      this.setState({ from: value });
      
    };

    inputTo.value = String(to);

    inputTo.onchange = () => {
      const value = Number(inputTo.value);
      this.setState({ to: value });
    
    };

    inputMin.value = String(min);

    inputMin.onchange = () => {
      const value = Number(inputMin.value);
      this.setState({ min: value });
    
    };

    inputMax.value = String(max);

    inputMax.onchange = () => {
      const value = Number(inputMax.value);
      this.setState({ max: value });
   
    };
    inputStep.value = String(step);

    inputStep.onchange = () => {
      const value = Number(inputStep.value);
      this.setState({ step: value });
    
    };
    inputColor.value = String(color);

   inputColor.onchange = () => {
      const { value } = inputColor;
      this.setState({ color: value });
    
    };

    inputScalePrefix.value = scalePrefix;

    inputScalePrefix.onchange = () => {
      const { value } = inputScalePrefix;
      this.setState({ scalePrefix: value });
    };
  }

  private setState(newOptions: Partial<Options>) {
    this.state = { ...this.state, ...newOptions };
    this.slider.setOptions(this.state);
    this.slider.upDateView()
  }
}

export { Demo };
