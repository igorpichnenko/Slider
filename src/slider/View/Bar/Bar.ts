import {
  IViewState,
} from '../../interfaces/interfaces';
import { classNames } from '../../libs/classNames';

class Bar {
  constructor(options: IViewState) {
    this.create(options);
  }

  private create(options: IViewState): void {
    const {
      slider,
    } = options;

    const bar = document.createElement('div');
    bar.className = classNames.bar;
    slider.append(bar);
    this.updataColor(options, bar);
    this.updataBar(options, bar);
  }

  public upData(options: IViewState) {
    const {
      slider,
    } = options;

    const bar = slider.querySelector(classNames.findBar)! as HTMLElement;

    this.updataColor(options, bar);
    this.updataBar(options, bar);
  }

  private updataColor(options: IViewState, bar: HTMLElement) {
    const {
      color,
      isGradient,
      gradient,
      gradientDeg,
      isChangeColor,
    } = options;
    const isSetGradient = isChangeColor && isGradient;
    const isSetColor = isChangeColor && !isGradient;

    if (isSetGradient) {
      bar.style.background = `linear-gradient(${gradientDeg}deg, ${color}, ${gradient})`;
    } if (isSetColor) {
      bar.style.background = color;
    }
  }

  private getRollerPositions(options: IViewState): number[] {
    const {
      slider,
    } = options;

    const [firstRoller, secondRoller] = Array.from(slider.querySelectorAll(classNames.findRollers))

    const rollersPositions = [this.calculatePosition(firstRoller, options),
      this.calculatePosition(secondRoller, options)];

    return rollersPositions.sort((a, b) => a - b);
  }

  private calculatePosition(element: Element, options: IViewState): number {
    const {
      isVertical,
    } = options;
    let position = 0;
    const width = Number.parseInt(getComputedStyle(element).width, 10);

    if (!isVertical) {
      position = element.getBoundingClientRect().left + width / 2;
    } else {
      position = element.getBoundingClientRect().top + width / 2;
    }
    return position;
  }

  private convertPxToProcent(value: number, options: IViewState): number {
    const {
      size,
    } = options;
    return (value * 100) / size;
  }

  private updataBar(options: IViewState, bar: HTMLElement) {
    const {
      isVertical, isDouble,
    } = options;

    const side: 'left' | 'top' = !isVertical ? 'left' : 'top';

    const direction: 'width' | 'height' = !isVertical ? 'width' : 'height';
    
    const [ firstRollerPosition, secondRollerPosition] = this.getRollerPositions(options);

    const sliderPos = this.getNewSliderPos(options);
    const isSingleHorizontal = isDouble && !isVertical;

    if (isSingleHorizontal) {
      const to = this.convertPxToProcent(Math.abs(secondRollerPosition - sliderPos), options);

      bar.style[side] = '0%';
      bar.style[direction] = `${to}%`;
    } else {
      const from = this.convertPxToProcent(Math.abs(secondRollerPosition - sliderPos), options);
      const to = 100 - from;

      bar.style[side] = `${from}%`;
      bar.style[direction] = `${to}%`;
    }

    if (!isDouble) {
      const from = this.convertPxToProcent(Math.abs(firstRollerPosition - sliderPos), options);

      const to = this.convertPxToProcent(Math.abs(secondRollerPosition - firstRollerPosition), options);

      bar.style[side] = `${from}%`;
      bar.style[direction] = `${to}%`;
    }
  }

  public getNewSliderPos({ slider, isVertical }: IViewState): number {
    let position = 0;

    if (!isVertical) {
      position = slider.getBoundingClientRect().left;
    } else {
      position = slider.getBoundingClientRect().top;
    }
    return position;
  }
}

export {
  Bar,
};
