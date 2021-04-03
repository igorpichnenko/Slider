import { IViewState, Orientation, SliderType } from '../../interfaces/interfaces';

class Bar {
  constructor(options: IViewState) {
    this.create(options);
  }

  private create(options: IViewState): void {
    const { slider, orientation } = options;

    const bar = document.createElement('div');

    bar.className = `slider__bar slider__bar_${orientation} js-slider__bar js-slider__bar_${orientation}`;

    slider.append(bar);
    this.updataColor(options, bar);
    this.updataBar(options, bar);
  }

  public upData(options: IViewState) {
    const { slider } = options;

    const bar = slider.querySelector('.js-slider__bar')! as HTMLElement;

    this.updataColor(options, bar);
    this.updataBar(options, bar);
  }

  private updataColor(options: IViewState, bar: HTMLElement) {
    const {
      color, isGradient, gradient, gradientDeg, isChangeColor,
    } = options;
    if (isChangeColor === true) {
      if (isGradient === true) {
        bar.style.background = `linear-gradient(${gradientDeg}deg, ${color}, ${gradient})`;
      } else {
        bar.style.background = color;
      }
    }
  }

  private getRollerPositions(options: IViewState): number[] {
    const { slider } = options;

    const rollers = slider.querySelectorAll('.js-slider__roller');

    const rollersPositions = [this.calculatePosition(rollers[0], options),
      this.calculatePosition(rollers[1], options)];

    return rollersPositions.sort((a, b) => a - b);
  }

  private calculatePosition(element: Element, options: IViewState): number {
    const { orientation } = options;

    const side: 'left' | 'top' = orientation === Orientation[1] ? 'left' : 'top';
    const width = Number.parseInt(getComputedStyle(element).width, 10);

    return element.getBoundingClientRect()[side] + width / 2;
  }

  private convertPxToProcent(value: number, options: IViewState): number {
    const {
      size,
    } = options;
    return (value * 100) / size;
  }

  private updataBar(options: IViewState, bar: HTMLElement) {
    const { type, orientation } = options;

    const isHorizontal = orientation === Orientation[1];

    const side: 'left' | 'top' = isHorizontal ? 'left' : 'top';

    const direction: 'width' | 'height' = isHorizontal ? 'width' : 'height';

    const rollerPos = this.getRollerPositions(options);

    const isSingle = type === SliderType[1];

    const sliderPos = this.getNewSliderPos(options);

    if (isSingle) {
      if (isHorizontal) {
        const to = this.convertPxToProcent(Math.abs(rollerPos[1] - sliderPos), options);

        bar.style[side] = '0%';
        bar.style[direction] = `${to}%`;
      } else {
        const from = this.convertPxToProcent(Math.abs(rollerPos[1] - sliderPos), options);
        const to = 100 - from;

        bar.style[side] = `${from}%`;
        bar.style[direction] = `${to}%`;
      }
    } else {
      const from = this.convertPxToProcent(Math.abs(rollerPos[0] - sliderPos), options);

      const to = this.convertPxToProcent(Math.abs(rollerPos[1] - rollerPos[0]), options);

      bar.style[side] = `${from}%`;
      bar.style[direction] = `${to}%`;
    }
  }

  public getNewSliderPos(options: IViewState): number {
    const { orientation, slider } = options;

    let position = 0;

    if (orientation === Orientation[1]) {
      position = slider.getBoundingClientRect().left;
    } else {
      position = slider.getBoundingClientRect().top;
    }
    return position;
  }
}

export { Bar };
