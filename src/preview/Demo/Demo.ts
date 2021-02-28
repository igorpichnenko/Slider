import { Presenter } from '../../slider/Presenter/Presenter';
import { Options } from '../../slider/interfaces/interfaces';
import { demoTemplate } from './demoTemplate';

class Demo {
  public state: Options;

  public demoTools: HTMLElement;

  constructor(private slider: Presenter) {
    this.state = slider.getOptions();
    this.demoTools = this.createTools();
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

    this.slider.emitter.subscribe('newData', this.upData);
  }

  private createTools(): HTMLElement {
    const demoTools = document.createElement('div');
    demoTools.className = 'demoTools';

    return demoTools;
  }

  private createSettings() {
    this.slider.element.after(this.demoTools);

    this.demoTools.insertAdjacentHTML('beforeend', demoTemplate);
  }

  private initTools() {
    const {
      orientation, isScale, type, isLabel, from, to, min, max, postfix, step,
      color, isScalePostfix, scalePostfix, minMax,
      fromTo, isTrackPostfix, trackPostfix, isColor, gradient, isColorOut,
      changeColor, isGradient, gradientDeg,
      onlyDivisions, isPostfix, isChangeColor,
      separate, isSeparate, isPrefix,
    } = this.state;

    const btnScale = this.demoTools.querySelector('.js-btn-scale')! as HTMLButtonElement;

    const btnView = this.demoTools.querySelector('.js-btn-view')! as HTMLButtonElement;

    const btnPostfix = this.demoTools.querySelector('.js-btn-postfix')! as HTMLButtonElement;

    const btnColor = this.demoTools.querySelector('.js-btn-color')! as HTMLButtonElement;

    const menuScale = this.demoTools.querySelector('.js-menu-scale')! as HTMLElement;

    const menuView = this.demoTools.querySelector('.js-menu-view')! as HTMLElement;

    const menuPostfix = this.demoTools.querySelector('.js-menu-postfix')! as HTMLElement;

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

    const inputSeparate = this.demoTools.querySelector('.js-separate')! as HTMLInputElement;

    const inputColor = this.demoTools.querySelector('.js-color')! as HTMLInputElement;

    const inputIsPostfix = this.demoTools.querySelector('.js-isPostfix')! as HTMLInputElement;

    const inputIsPrefix = this.demoTools.querySelector('.js-isPrefix-all')! as HTMLInputElement;

    const inputScalePostfix = this.demoTools.querySelector('.js-scale-postfix')! as HTMLInputElement;

    const inputIsChangeColor = this.demoTools.querySelector('.js-isChangeColor')! as HTMLInputElement;

    const inputMinMax = this.demoTools.querySelector('.js-minMax')! as HTMLInputElement;

    const inputIsSeparate = this.demoTools.querySelector('.js-isScaleDel')! as HTMLInputElement;

    const inputFromTo = this.demoTools.querySelector('.js-fromTo')! as HTMLInputElement;

    const inputDivision = this.demoTools.querySelector('.js-division')! as HTMLInputElement;

    const inputIsTrackPostfix = this.demoTools.querySelector('.js-isTrackPostfix')! as HTMLInputElement;

    const inputIsToolPostfix = this.demoTools.querySelector('.js-isPostfixTool')! as HTMLInputElement;

    const inputTrackPostfix = this.demoTools.querySelector('.js-track-postfix')! as HTMLInputElement;

    const inputIsColor = this.demoTools.querySelector('.js-isColor')! as HTMLInputElement;

    const inputChangeColor = this.demoTools.querySelector('.js-changeColor')! as HTMLInputElement;

    const inputGradient = this.demoTools.querySelector('.js-gradient')! as HTMLInputElement;

    const inputGradientOut = this.demoTools.querySelector('.js-gradient-out')! as HTMLInputElement;

    const inputGradientDeg = this.demoTools.querySelector('.js-gradient-deg')! as HTMLInputElement;

    btnView.onclick = () => {
      menuView.classList.toggle('js-close-menu');
    };

    btnScale.onclick = () => {
      menuScale.classList.toggle('js-close-menu');
    };
    btnColor.onclick = () => {
      menuColor.classList.toggle('js-close-menu');
    };
    btnPostfix.onclick = () => {
      menuPostfix.classList.toggle('js-close-menu');
    };

    /**     чекбоксы    * */

    isOrientation.onchange = () => {
      if (orientation === 'horizontal') {
        this.setState({ orientation: 'vertical' });
      }
      if (orientation === 'vertical') {
        this.setState({ orientation: 'horizontal' });
      }
    };

    inputIsPostfix.onchange = () => {
      if (isScalePostfix === true) {
        this.setState({ isScalePostfix: false });
      }
      if (isScalePostfix === false) {
        this.setState({ isScalePostfix: true });
      }
    };

    inputIsToolPostfix.onchange = () => {
      if (isPostfix === true) {
        this.setState({ isPostfix: false });
      }
      if (isPostfix === false) {
        this.setState({ isPostfix: true });
      }
    };

    inputIsPrefix.onchange = () => {
      if (isPrefix === true) {
        this.setState({ isPrefix: false });
      }
      if (isPrefix === false) {
        this.setState({ isPrefix: true });
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

    inputIsChangeColor.onchange = () => {
      if (isChangeColor === true) {
        this.setState({ isChangeColor: false });
      }
      if (isChangeColor === false) {
        this.setState({ isChangeColor: true });
      }
    };

    inputIsSeparate.onchange = () => {
      if (isSeparate === true) {
        this.setState({ isSeparate: false });
      }
      if (isSeparate === false) {
        this.setState({ isSeparate: true });
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

    inputDivision.onchange = () => {
      if (onlyDivisions === false) {
        this.setState({ onlyDivisions: true });
      } else {
        this.setState({ onlyDivisions: false });
      }
    };

    inputIsTrackPostfix.onchange = () => {
      if (isTrackPostfix === false) {
        this.setState({ isTrackPostfix: true });
      } else {
        this.setState({ isTrackPostfix: false });
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

    //* *     инпуты    **/

    inputMarker.value = postfix;

    inputMarker.onchange = () => {
      const { value } = inputMarker;
      this.setState({ postfix: value });
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

    // валидация ввода
    if (separate === undefined) {
      inputSeparate.value = ' ';
    } else if (separate === ' ') {
      inputSeparate.value = ' ';
    } else {
      inputSeparate.value = separate;
    }
    inputSeparate.onchange = () => {
      let { value } = inputSeparate;

      if (value !== '.' && value !== ',') {
        value = ' ';
      }

      this.setState({ separate: value });
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

    inputScalePostfix.value = scalePostfix;

    inputScalePostfix.onchange = () => {
      const { value } = inputScalePostfix;
      this.setState({ scalePostfix: value });
    };

    inputTrackPostfix.value = trackPostfix;

    inputTrackPostfix.onchange = () => {
      const { value } = inputTrackPostfix;
      this.setState({ trackPostfix: value });
    };
  }

  public setState(newOptions: Partial<Options>) {
    this.state = { ...this.state, ...newOptions };
    this.slider.setOptions(this.state);
    this.slider.upDataView();
  }
}

export { Demo };
