import {
  IViewState,
  Orientation,
  SliderType,
} from '../../interfaces/interfaces';
import { correctSeparate } from '../../libs/correctSeparate';

class Rollers {
  constructor(options: IViewState) {
    this.create(options);
  }

  private create(options: IViewState) {
    const {
      slider,
      orientation,
    } = options;

    const rollerFirst = document.createElement('div');
    rollerFirst.className = `slider__roller js-slider__roller slider__roller_first js-slider__roller_first slider__roller_${orientation} js-slider__roller_${orientation}`;

    const rollerSecond = document.createElement('div');

    rollerSecond.className = `slider__roller_second js-slider__roller js-slider__roller_second
    slider__roller
    slider__roller_${orientation} js-slider__roller_${orientation}`;

    slider.append(rollerFirst);
    slider.append(rollerSecond);

    this.createTooltip(rollerFirst, rollerSecond, options);
    this.moveRollersAtValue(options, rollerFirst, rollerSecond);
    this.toggleRollers(options, rollerSecond);
    this.updataColor(options, rollerFirst, rollerSecond);
  }

  private createTooltip(rollerFirst: HTMLElement, rollerSecond: HTMLElement, options: IViewState) {
    const {
      orientation,
    } = options;

    const fistTooltip = document.createElement('div');
    fistTooltip.className = `slider__tooltip_first js-slider__tooltip_first js-slider__tooltip slider__tooltip slider__tooltip_${orientation} js-slider__tooltip_${orientation}`;
    const secondTooltip = document.createElement('div');
    secondTooltip.className = `slider__tooltip_second js-slider__tooltip js-slider__tooltip_second slider__tooltip slider__tooltip_${orientation} js-slider__tooltip_${orientation}`;

    rollerFirst.append(fistTooltip);
    rollerSecond.append(secondTooltip);

    this.updataOutTooltip(fistTooltip, secondTooltip, options);
  }

  private updataOutTooltip(fistTooltip: HTMLElement,
    secondTooltip: HTMLElement, options: IViewState) {
    const {
      to,
      from,
      isPostfix,
      isLabel,
      isPrefix,
    } = options;

    let {
      postfix,
    } = options;

    if (isPostfix === false) {
      postfix = '';
    }

    const isSetPrefix = isLabel === true && isPrefix === true;
    const isSetPostfix = isLabel === true && isPrefix === false;
    // настройки постфикс
    if (isSetPostfix) {
      fistTooltip.innerHTML = `${correctSeparate(from, options)}${postfix}`;
      secondTooltip.innerHTML = `${correctSeparate(to, options)}${postfix}`;
    }
    // настройки префикс
    if (isSetPrefix) {
      fistTooltip.innerHTML = `${postfix}${correctSeparate(from, options)}`;
      secondTooltip.innerHTML = `${postfix}${correctSeparate(to, options)}`;
    }

    this.setColor(fistTooltip, secondTooltip, options);
  }

  private setColor(fistTooltip: HTMLElement,
    secondTooltip: HTMLElement, options: IViewState) {
    const {
      color,
      gradient,
      isColorOut,
      allColors,
      isChangeColor,
      isLabel,
    } = options;

    /**
    * Задумка сделать обратный конвектор из 16-ричного в обычный вид, например #fff в
    white, и в дальнейшем соьирался дополнять перевод
    * */
    let newColor = allColors[color];
    let newGradient = allColors[gradient];

    if (newGradient === undefined) {
      newGradient = gradient;
    }

    if (newColor === undefined) {
      newColor = color;
    }

    const setNewColor = isChangeColor === true && isColorOut === true;

    if (setNewColor) {
      fistTooltip.innerHTML = String(newColor);
      secondTooltip.innerHTML = String(newGradient);

      fistTooltip.style.backgroundColor = `${color}`;
      secondTooltip.style.backgroundColor = `${gradient}`;
      fistTooltip.classList.add('slider__tooltip_white-color');
      secondTooltip.classList.add('slider__tooltip_white-color');
    }

    if (isLabel === false) {
      fistTooltip.classList.add('slider__tooltip_display-none');
      secondTooltip.classList.add('slider__tooltip_display-none');
    }
  }

  private updataColor(options: IViewState, rollerFirst: HTMLElement, rollerSecond: HTMLElement) {
    const {
      color,
      isGradient,
      gradient,
      isChangeColor,
      gradientDeg,
    } = options;
    const isChangeGradient = isChangeColor === true && isGradient === true;
    const isColor = isChangeColor === true && isGradient === false;

    if (isChangeGradient) {
      rollerFirst.style.background = `linear-gradient(${gradientDeg}deg, ${color}, ${gradient})`;
      rollerSecond.style.background = `linear-gradient(${gradientDeg}deg, ${color}, ${gradient})`;
    } if (isColor) {
      rollerFirst.style.background = color;
      rollerSecond.style.background = color;
    }
  }

  public moveRollersAtValue(options: IViewState, rollerFirst: HTMLElement,
    rollerSecond: HTMLElement): void {
    const {
      to,
      from,
      orientation,
    } = options;

    const pxTo = this.convertValueToPx(to, options);
    const pxFrom = this.convertValueToPx(from, options);

    const positionTo = this.convertPxToProcent(pxTo, options);
    const positionFrom = this.convertPxToProcent(pxFrom, options);

    if (orientation === Orientation[1]) {
      rollerFirst.style.left = `${positionFrom}%`;
      rollerSecond.style.left = `${positionTo}%`;
    } else {
      rollerFirst.style.bottom = `${positionFrom}%`;
      rollerSecond.style.bottom = `${positionTo}%`;
    }
  }

  public upData(options: IViewState) {
    const {
      slider,
    } = options;

    const rollerFirst = slider.querySelector('.js-slider__roller_first')! as HTMLElement;
    const rollerSecond = slider.querySelector('.js-slider__roller_second')! as HTMLElement;
    const fistTooltip = slider.querySelector('.js-slider__tooltip_first')! as HTMLElement;
    const secondTooltip = slider.querySelector('.js-slider__tooltip_second')! as HTMLElement;

    this.moveRollersAtValue(options, rollerFirst, rollerSecond);
    this.toggleRollers(options, rollerSecond);
    this.updataColor(options, rollerFirst, rollerSecond);
    this.updataOutTooltip(fistTooltip, secondTooltip, options);
  }

  private convertValueToPx(value: number, options: IViewState): number {
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

  private convertPxToProcent(value: number, options: IViewState): number {
    const {
      size,
    } = options;
    return (value * 100) / size;
  }

  private toggleRollers(options: IViewState, element: HTMLElement): void {
    const {
      type,
    } = options;

    if (type === SliderType[1]) {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  }
}

export {
  Rollers,
};
