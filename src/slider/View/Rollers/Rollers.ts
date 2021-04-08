import {
  IViewState,
} from '../../interfaces/interfaces';
import { correctSeparate } from '../../libs/correctSeparate';
import { classNames } from '../../libs/classNames';

class Rollers {
  constructor(options: IViewState) {
    this.create(options);
  }

  private create(options: IViewState) {
    const {
      slider,
    } = options;

    const rollerFirst = document.createElement('div');
    rollerFirst.className = classNames.rollerFirst;
    const rollerSecond = document.createElement('div');
    rollerSecond.className = classNames.rollerSecond;

    slider.append(rollerFirst);
    slider.append(rollerSecond);

    this.createTooltip(rollerFirst, rollerSecond, options);
    this.moveRollersAtValue(options, rollerFirst, rollerSecond);
    this.toggleRollers(options, rollerSecond);
    this.updataColor(options, rollerFirst, rollerSecond);
  }

  private createTooltip(rollerFirst: HTMLElement, rollerSecond: HTMLElement, options: IViewState) {
    const firstTooltip = document.createElement('div');
    firstTooltip.className = classNames.firstTooltip;
    const secondTooltip = document.createElement('div');
    secondTooltip.className = classNames.secondTooltip;
    rollerFirst.append(firstTooltip);
    rollerSecond.append(secondTooltip);

    this.updataOutTooltip(firstTooltip, secondTooltip, options);
  }

  private updataOutTooltip(firstTooltip: HTMLElement,
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
      firstTooltip.innerHTML = `${correctSeparate(from, options)}${postfix}`;
      secondTooltip.innerHTML = `${correctSeparate(to, options)}${postfix}`;
    }
    // настройки префикс
    if (isSetPrefix) {
      firstTooltip.innerHTML = `${postfix}${correctSeparate(from, options)}`;
      secondTooltip.innerHTML = `${postfix}${correctSeparate(to, options)}`;
    }

    this.setColor(firstTooltip, secondTooltip, options);
  }

  private setColor(firstTooltip: HTMLElement,
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
      firstTooltip.innerHTML = String(newColor);
      secondTooltip.innerHTML = String(newGradient);

      firstTooltip.style.backgroundColor = `${color}`;
      secondTooltip.style.backgroundColor = `${gradient}`;
      firstTooltip.classList.add(classNames.tooltipWhite);
      secondTooltip.classList.add(classNames.tooltipWhite);
    }

    if (isLabel === false) {
      firstTooltip.classList.add(classNames.tooltipDisplay);
      secondTooltip.classList.add(classNames.tooltipDisplay);
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
      isVertical,
    } = options;

    const pxTo = this.convertValueToPx(to, options);
    const pxFrom = this.convertValueToPx(from, options);

    const positionTo = this.convertPxToProcent(pxTo, options);
    const positionFrom = this.convertPxToProcent(pxFrom, options);

    if (!isVertical) {
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
    const firstTooltip = slider.querySelector('.js-slider__tooltip_first')! as HTMLElement;
    const secondTooltip = slider.querySelector('.js-slider__tooltip_second')! as HTMLElement;

    this.moveRollersAtValue(options, rollerFirst, rollerSecond);
    this.toggleRollers(options, rollerSecond);
    this.updataColor(options, rollerFirst, rollerSecond);
    this.updataOutTooltip(firstTooltip, secondTooltip, options);
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
      isDouble,
    } = options;

    if (isDouble) {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  }
}

export {
  Rollers,
};
