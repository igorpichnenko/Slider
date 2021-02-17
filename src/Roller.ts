import { ViewState } from './interfaces';

class Roller {
  constructor(options: ViewState) {
    this.create(options);
  }

  public updateState(options: ViewState) {
    const { slider } = options;

    const rollerFirst = slider.querySelector('.slider__roller_first')! as HTMLElement;

    const rollerSecond = slider.querySelector('.slider__roller_second')! as HTMLElement;

    this.moveRollersAtValue(options, rollerFirst, rollerSecond);
    this.toggleRollers(options, rollerSecond);
    this.updateColor(options, rollerFirst, rollerSecond);
  }

  private create(options: ViewState) {
    const { slider, orientation } = options;

    const rollerFirst = document.createElement('div');
    rollerFirst.classList.add(
      'slider__roller',
      'slider__roller_first',
      `slider__roller_${orientation}`,
    );
    const rollerSecond = document.createElement('div');

    rollerSecond.classList.add(
      'slider__roller_second',
      'slider__roller',
      `slider__roller_${orientation}`,
    );

    slider.append(rollerFirst);
    slider.append(rollerSecond);

    this.moveRollersAtValue(options, rollerFirst, rollerSecond);
    this.toggleRollers(options, rollerSecond);
    this.updateColor(options, rollerFirst, rollerSecond);
  }

  private updateColor(options: ViewState, rollerFirst: HTMLElement, rollerSecond: HTMLElement) {
    const { color } = options;
    rollerFirst.style.background = `${color}`;
    rollerSecond.style.background = `${color}`;
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

    this.updateOutValue(options, rollerFirst, rollerSecond);
  }

  private updateOutValue(options: ViewState, rollerFirst: HTMLElement, rollerSecond: HTMLElement) {
    const {
      to,
      from,
      prefix,
      isLabel,
    } = options;

    if (isLabel === true) {
      rollerFirst.setAttribute('data-text', `${from.toLocaleString()}${prefix}`);

      rollerSecond.setAttribute('data-text', `${to.toLocaleString()}${prefix}`);
    } else {
      rollerFirst.setAttribute('data-text', '');

      rollerSecond.setAttribute('data-text', '');
    }
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

export { Roller };
