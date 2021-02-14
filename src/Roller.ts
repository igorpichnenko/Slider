import { ViewState } from './interfaces';

class Roller {
  constructor(options: ViewState) {
    this.create(options);
  }

  public updateState(options: ViewState) {
    this.create(options);
  }

  private create(options: ViewState) {
    const {
      slider, orientation,
    } = options;

    const isRollers = slider.querySelector('.slider__roller');

    if (isRollers === null) {
      const rollerFirst = document.createElement('div');
      rollerFirst.classList.add(
        'slider__roller',
        `slider__roller_${orientation}`,
        'slider__roller_first',
      );
      const rollerSecond = document.createElement('div');

      rollerSecond.classList.add(
        'slider__roller',
        `slider__roller_${orientation}`, 'slider__roller_second',
      );

      slider.append(rollerFirst);
      slider.append(rollerSecond);

      this.moveRollersAtValue(options, rollerFirst, rollerSecond);
      this.toggleRollers(options, rollerSecond);
    } else {
      const rollerFirst = slider.querySelector('.slider__roller_first')! as HTMLElement;

      const rollerSecond = slider.querySelector('.slider__roller_second')! as HTMLElement;
      this.moveRollersAtValue(options, rollerFirst, rollerSecond);
      this.toggleRollers(options, rollerSecond);
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

    this.updateOutValue(options, rollerFirst, rollerSecond);
  }

  private updateOutValue(options: ViewState, rollerFirst: HTMLElement, rollerSecond: HTMLElement) {
    const {
      to,
      from,
      marker,
    } = options;

    rollerFirst.setAttribute('data-text', `${from.toLocaleString()}${marker}`);

    rollerSecond.setAttribute('data-text', `${to.toLocaleString()}${marker}`);
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
