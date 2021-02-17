import { ViewState } from './interfaces';

class Bar {
  constructor(options: ViewState) {
    this.create(options);
  }

  public updateState(options: ViewState) {
    const { slider } = options;

    const bar = slider.querySelector('.slider__bar')! as HTMLElement;

    this.updateColor(options, bar);
    this.updateBar(options, bar);
  }

  private create(options: ViewState): void {
    const { slider, orientation } = options;

    const bar = document.createElement('div');

    bar.className = `slider__bar slider__bar_${orientation}`;

    slider.append(bar);

    this.updateColor(options, bar);
    this.updateBar(options, bar);
  }

  private updateColor(options: ViewState, bar: HTMLElement) {
    const { color } = options;
    bar.style.background = `${color}`;
  }

  private getRollerPositions(options: ViewState): number[] {
    const { slider, orientation } = options;

    const rollers = slider.querySelectorAll('.slider__roller');

    const calculatePosition = (element: Element): number => {
      const side: 'left' | 'top' = orientation === 'horizontal' ? 'left' : 'top';
      const width = Number.parseInt(getComputedStyle(element).width, 10);

      return element.getBoundingClientRect()[side] + width / 2;
    };

    const rollersPositions = [calculatePosition(rollers[0]),
      calculatePosition(rollers[1])];

    return rollersPositions.sort((a, b) => a - b);
  }

  private updateBar(options: ViewState, bar: HTMLElement) {
    const {
      sliderPos, type, orientation,
    } = options;

    const isHorizontal = orientation === 'horizontal';

    const side: 'left' | 'top' = isHorizontal ? 'left' : 'top';

    const direction: 'width' | 'height' = isHorizontal ? 'width' : 'height';

    const rollerPos = this.getRollerPositions(options);

    const isSingle = type === 'single';

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

  private convertPxToProcent(value: number, options: ViewState): number {
    const {
      size,
    } = options;
    return (value * 100) / size;
  }
}

export { Bar };
