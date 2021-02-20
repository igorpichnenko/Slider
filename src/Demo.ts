import { Presenter } from './Presenter';
import { Options } from './interfaces';
import { demoTemplate } from './demoTemplate';

class Demo {
  public state: Options;

  private element: JQuery<HTMLElement>;

  private demoTools: HTMLElement;

  constructor(private slider: Presenter, element: JQuery<HTMLElement>) {
    this.state = slider.getOptions();
    this.demoTools = this.createTools();
    this.element = element;
    this.init();
  }

  public upData(newSetting: Partial<Options>) {
    this.state = { ...this.state, ...newSetting };
    this.initTools();
  }

  private init() {
    this.createSettings();
    this.initTools();

    this.upData = this.upData.bind(this);

    this.slider.observable.subscribe('newData', this.upData);
  }

  private createTools(): HTMLElement {
    const demoTools = document.createElement('div');
    demoTools.className = 'demoTools';
    return demoTools;
  }

  private createSettings() {
    this.element.append(this.demoTools);
    this.demoTools.insertAdjacentHTML('beforeend', demoTemplate);
  }

  private initTools() {
    const {
      orientation, isScale, type, isLabel, from, to, min, max, prefix, step,
      color, isScalePrefix, scalePrefix, minMax,
      fromTo, isTrackPrefix, trackPrefix, isColor, gradient, isColorOut,
      changeColor, isGradient, gradientDeg,
    } = this.state;

    const btn = this.demoTools.querySelector('.js-btn')! as HTMLElement;
    const btnNav = this.demoTools.querySelector('.js-btn-navigate')! as HTMLElement;
    const btnView = this.demoTools.querySelector('.js-btn-view')! as HTMLElement;
    const btnPrefix = this.demoTools.querySelector('.js-btn-prefix')! as HTMLElement;
    const btnColor = this.demoTools.querySelector('.js-btn-color')! as HTMLElement;
    const menu = this.demoTools.querySelector('.js-menu')! as HTMLElement;
    const menuNav = this.demoTools.querySelector('.js-menu-navigate')! as HTMLElement;
    const menuView = this.demoTools.querySelector('.js-menu-view')! as HTMLElement;
    const menuPrefix = this.demoTools.querySelector('.js-menu-prefix')! as HTMLElement;
    const menuColor = this.demoTools.querySelector('.js-color-setting')! as HTMLElement;
    const isOrientation = this.demoTools.querySelector('.js-orientation')! as HTMLElement;
    const changeScale = this.demoTools.querySelector('.js-isScale')! as HTMLElement;
    const inputColorOut = this.demoTools.querySelector('.js-isColorOut')! as HTMLElement;
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
    const inputScalePrefix = this.demoTools.querySelector('.js-scale-prefix')! as HTMLInputElement;
    const inputMinMax = this.demoTools.querySelector('.js-minMax')! as HTMLInputElement;
    const inputFromTo = this.demoTools.querySelector('.js-fromTo')! as HTMLInputElement;
    const inputIsTrackPrefix = this.demoTools.querySelector('.js-isTrackPrefix')! as HTMLInputElement;
    const inputTrackPrefix = this.demoTools.querySelector('.js-track-prefix')! as HTMLInputElement;
    const inputIsColor = this.demoTools.querySelector('.js-isColor')! as HTMLInputElement;
    const inputChangeColor = this.demoTools.querySelector('.js-changeColor')! as HTMLInputElement;
    const inputGradient = this.demoTools.querySelector('.js-gradient')! as HTMLInputElement;
    const inputGradientOut = this.demoTools.querySelector('.js-gradient-out')! as HTMLInputElement;
    const inputGradientDeg = this.demoTools.querySelector('.js-gradient-deg')! as HTMLInputElement;
    const inputChangeSize = this.demoTools.querySelector('.js-slider-size')! as HTMLInputElement;

    btn.onclick = () => {
      menu.classList.toggle('js-close-menu');
    };
    btnView.onclick = () => {
      menuView.classList.toggle('js-close-menu');
    };
    btnNav.onclick = () => {
      menuNav.classList.toggle('js-close-menu');
    };
    btnColor.onclick = () => {
      menuColor.classList.toggle('js-close-menu');
    };
    btnPrefix.onclick = () => {
      menuPrefix.classList.toggle('js-close-menu');
    };
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
    inputGradient.onchange = () => {
      if (isGradient === true) {
        this.setState({ isGradient: false });
      }
      if (isGradient === false) {
        this.setState({ isGradient: true });
      }
    };
    inputColorOut.onchange = () => {
      if (isColorOut === true) {
        this.setState({ isColorOut: false });
      }
      if (isColorOut === false) {
        this.setState({ isColorOut: true });
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
    inputMinMax.onchange = () => {
      if (minMax === false) {
        this.setState({ minMax: true });
      } else {
        this.setState({ minMax: false });
      }
    };
    inputFromTo.onchange = () => {
      if (fromTo === false) {
        this.setState({ fromTo: true });
      } else {
        this.setState({ fromTo: false });
      }
    };
    inputIsTrackPrefix.onchange = () => {
      if (isTrackPrefix === false) {
        this.setState({ isTrackPrefix: true });
      } else {
        this.setState({ isTrackPrefix: false });
      }
    };
    inputIsColor.onchange = () => {
      if (isColor === true) {
        this.setState({ isColor: false });
      } else {
        this.setState({ isColor: true });
      }
    };
    inputChangeColor.onchange = () => {
      if (changeColor === true) {
        this.setState({ changeColor: false });
      } else {
        this.setState({ changeColor: true });
      }
    };
    inputMarker.value = prefix;

    inputMarker.onchange = () => {
      const { value } = inputMarker;
      this.setState({ prefix: value });
    };

    inputChangeSize.onchange = () => {
      const value = Number(inputChangeSize.value);
      const slider = $('.js-toxin-slider');
      if (orientation === 'horizontal') {
        slider.css({ width: `${value}px` });
      } if (orientation === 'vertical') {
        slider.css({ height: `${value}px` });
      }

      this.slider.upDataView();
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
    inputGradientOut.value = String(gradient);

    inputGradientOut.onchange = () => {
      const { value } = inputGradientOut;
      this.setState({ gradient: value });
    };
    inputGradientDeg.value = String(gradientDeg);

    inputGradientDeg.onchange = () => {
      const value = Number(inputGradientDeg.value);
      this.setState({ gradientDeg: value });
    };

    inputScalePrefix.value = scalePrefix;

    inputScalePrefix.onchange = () => {
      const { value } = inputScalePrefix;
      this.setState({ scalePrefix: value });
    };
    inputTrackPrefix.value = trackPrefix;

    inputTrackPrefix.onchange = () => {
      const { value } = inputTrackPrefix;
      this.setState({ trackPrefix: value });
    };
  }

  private setState(newOptions: Partial<Options>) {
    this.state = { ...this.state, ...newOptions };
    this.slider.setOptions(this.state);
    this.slider.upDataView();
  }
}

export { Demo };
