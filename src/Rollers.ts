import { ViewState } from './interfaces';

class Rollers {
  constructor(options: ViewState) {
    this.create(options);
  }

  private create(options: ViewState) {
    const { slider, orientation } = options;

    const rollerFirst = document.createElement('div');
    rollerFirst.className = `slider__roller slider__roller_first slider__roller_${orientation}`;

    const rollerSecond = document.createElement('div');

    rollerSecond.className = `slider__roller_second
      slider__roller
      slider__roller_${orientation}`;

    slider.append(rollerFirst);
    slider.append(rollerSecond);

    this.createTooltip(rollerFirst, rollerSecond, options);
    this.moveRollersAtValue(options, rollerFirst, rollerSecond);
    this.toggleRollers(options, rollerSecond);
    this.updataColor(options, rollerFirst, rollerSecond);
  }

  private createTooltip(rollerFirst: HTMLElement, rollerSecond: HTMLElement, options: ViewState) {
    const { orientation } = options;

    const fistTooltip = document.createElement('div');
    fistTooltip.className = `slider__tooltip_first slider__tooltip slider__tooltip_${orientation}`;
    const secondTooltip = document.createElement('div');
    secondTooltip.className = `slider__tooltip_second slider__tooltip slider__tooltip_${orientation}`;

    rollerFirst.append(fistTooltip);
    rollerSecond.append(secondTooltip);

    this.updataOutTooltip(fistTooltip, secondTooltip, options);
  }

  private updataOutTooltip(fistTooltip: HTMLElement,
    secondTooltip: HTMLElement, options: ViewState) {
    const {
      to,
      from, color,
      prefix, isPrefix,
      isLabel, gradient,
      isColorOut, allColors,
    } = options;

    if (isLabel === true) {
      if (isPrefix === true) {
        fistTooltip.innerText = `${from.toLocaleString()}${prefix}`;
        secondTooltip.innerText = `${to.toLocaleString()}${prefix}`;
      } if (isPrefix === false) {
        fistTooltip.innerText = from.toLocaleString();
        secondTooltip.innerText = to.toLocaleString();
      }
    }

    let newColor = allColors[color];
    let newGradient = allColors[gradient];

    if (newGradient === undefined) {
      newGradient = gradient;
    }

    if (newColor === undefined) {
      newColor = color;
    }

    if (isColorOut === true) {
      fistTooltip.innerText = newColor.toLocaleString();
      secondTooltip.innerText = newGradient.toLocaleString();

      fistTooltip.style.backgroundColor = `${color}`;
      secondTooltip.style.backgroundColor = `${gradient}`;
      fistTooltip.style.color = 'white';
      secondTooltip.style.color = 'white';
    }
    if (isLabel === false) {
      fistTooltip.innerText = '';
      secondTooltip.innerText = '';
    }
  }

  private updataColor(options: ViewState, rollerFirst: HTMLElement, rollerSecond: HTMLElement) {
    const {
      color, isGradient, gradient, gradientDeg,
    } = options;
    if (isGradient === true) {
      rollerFirst.style.background = `linear-gradient(${gradientDeg}deg, ${color}, ${gradient})`;
      rollerSecond.style.background = `linear-gradient(${gradientDeg}deg, ${color}, ${gradient})`;
    } else {
      rollerFirst.style.background = color;
      rollerSecond.style.background = color;
    }
  }

  private moveRollersAtValue(options: ViewState, rollerFirst: HTMLElement,
    rollerSecond: HTMLElement): void {
    const {
      to,
      from, orientation,
    } = options;

    const pxTo = this.convertValueToPx(to, options);
    const pxFrom = this.convertValueToPx(from, options);

    const positionTo = this.convertPxToProcent(pxTo, options);
    const positionFrom = this.convertPxToProcent(pxFrom, options);

    if (orientation === 'horizontal') {
      rollerFirst.style.left = `${positionFrom}%`;
      rollerSecond.style.left = `${positionTo}%`;
    } else {
      rollerFirst.style.bottom = `${positionFrom}%`;
      rollerSecond.style.bottom = `${positionTo}%`;
    }
  }

  public upData(options: ViewState) {
    const { slider } = options;

    const rollerFirst = slider.querySelector('.slider__roller_first')! as HTMLElement;
    const rollerSecond = slider.querySelector('.slider__roller_second')! as HTMLElement;
    const fistTooltip = slider.querySelector('.slider__tooltip_first')! as HTMLElement;
    const secondTooltip = slider.querySelector('.slider__tooltip_second')! as HTMLElement;

    this.moveRollersAtValue(options, rollerFirst, rollerSecond);
    this.toggleRollers(options, rollerSecond);
    this.updataColor(options, rollerFirst, rollerSecond);
    this.updataOutTooltip(fistTooltip, secondTooltip, options);
  }

  private convertValueToPx(value: number, options: ViewState): number {
    const {
      min,
      max,
      step,
      size,
      oneStep,
    } = options;

    if (value === max) return size;

    return Math.round((value - min) / step) * oneStep;
  }

  private convertPxToProcent(value: number, options: ViewState): number {
    const {
      size,
    } = options;
    return (value * 100) / size;
  }

  private toggleRollers(options: ViewState, element: HTMLElement): void {
    const { type } = options;

    if (type === 'single') {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  }
}

export { Rollers };
