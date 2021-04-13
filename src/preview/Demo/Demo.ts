import { Presenter } from '../../slider/Presenter/Presenter';
import { IOptions, Events } from '../../slider/interfaces/interfaces';
import { demoTemplate } from './demoTemplate';

class Demo {
  public state: IOptions;

  public demoTools: HTMLElement;

  constructor(private slider: Presenter) {
    this.state = slider.getOptions();
    this.demoTools = this.createTools();
    this.init();
  }

  public upData(newSetting: Partial<IOptions>) {
    this.state = { ...this.state, ...newSetting };
    this.initTools();
  }

  private init() {
    this.createSettings();
    this.initTools();

    this.upData = this.upData.bind(this);

    this.slider.emitter.subscribe(Events.NEW_DATA, this.upData);
  }

  private createTools(): HTMLElement {
    const demoTools = document.createElement('div');
    demoTools.className = 'panel__tools';

    return demoTools;
  }

  private createSettings() {
    this.slider.element.after(this.demoTools);

    this.demoTools.insertAdjacentHTML('beforeend', demoTemplate);
  }

  private initTools() {
    const {
      isLabel, from, to, min, max, step, isVertical, isDouble,
    } = this.state;

    const isOrientation = this.demoTools.querySelector('.js-orientation')! as HTMLElement;

    const label = this.demoTools.querySelector('.js-isLabel')! as HTMLElement;

    const isDoubleType = this.demoTools.querySelector('.js-isDouble')! as HTMLElement;

    const inputFrom = this.demoTools.querySelector('.js-from')! as HTMLInputElement;

    const inputTo = this.demoTools.querySelector('.js-to')! as HTMLInputElement;

    const inputMin = this.demoTools.querySelector('.js-min')! as HTMLInputElement;

    const inputMax = this.demoTools.querySelector('.js-max')! as HTMLInputElement;

    const inputStep = this.demoTools.querySelector('.js-step')! as HTMLInputElement;

    /**     чекбоксы    * */

    isOrientation.onchange = () => {
      if (!isVertical) {
        this.setState({ isVertical: true });
      }
      if (isVertical) {
        this.setState({ isVertical: false });
      }
    };
    label.onchange = () => {
      if (isLabel) {
        this.setState({ isLabel: false });
      } if (!isLabel) {
        this.setState({ isLabel: true });
      }
    };

    isDoubleType.onchange = () => {
      if (!isDouble) {
        this.setState({ isDouble: true });
      }
      if (isDouble) {
        this.setState({ isDouble: false });
      }
    };
    //* *     инпуты    **/

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
  }

  public setState(newOptions: Partial<IOptions>) {
    this.state = { ...this.state, ...newOptions };
    this.slider.setOptions(this.state);
    this.slider.upDataView();
  }
}

export { Demo };
