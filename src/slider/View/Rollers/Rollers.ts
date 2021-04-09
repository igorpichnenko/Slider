import {
  IViewState,
} from '../../interfaces/interfaces';
import { correctSeparate } from '../../libs/correctSeparate';
import { classNames } from '../../libs/classNames';

class Rollers {
  rollers: HTMLElement [];

  tooltips: HTMLElement [];

  constructor(options: IViewState) {
    this.rollers = this.create(options);
    this.tooltips = this.createTooltip();
    this.moveRollersAtValue(options);
    this.toggleRollers(options);
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

    return [rollerFirst, rollerSecond];
  }

  private createTooltip() {
    const firstTooltip = document.createElement('div');
    firstTooltip.className = classNames.firstTooltip;
    const secondTooltip = document.createElement('div');
    secondTooltip.className = classNames.secondTooltip;

    this.rollers[0].append(firstTooltip);
    this.rollers[1].append(secondTooltip);

    return [firstTooltip, secondTooltip];
  }

  private updataOutTooltip(options: IViewState) {
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
      this.tooltips[0].innerHTML = `${correctSeparate(from, options)}${postfix}`;
      this.tooltips[1].innerHTML = `${correctSeparate(to, options)}${postfix}`;
    }
    // настройки префикс
    if (isSetPrefix) {
      this.tooltips[0].innerHTML = `${postfix}${correctSeparate(from, options)}`;
      this.tooltips[1].innerHTML = `${postfix}${correctSeparate(to, options)}`;
    }

    this.setColor(options);
  }

  private setColor(options: IViewState) {
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
      this.tooltips[0].innerHTML = String(newColor);
      this.tooltips[1].innerHTML = String(newGradient);

      this.tooltips[0].style.backgroundColor = `${color}`;
      this.tooltips[1].style.backgroundColor = `${gradient}`;
      this.tooltips[0].classList.add(classNames.tooltipWhite);
      this.tooltips[1].classList.add(classNames.tooltipWhite);
    }

    if (isLabel === false) {
      this.tooltips[0].classList.add(classNames.tooltipDisplay);
      this.tooltips[1].classList.add(classNames.tooltipDisplay);
    }
  }

  private updataColor(options: IViewState) {
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
      this.rollers[0].style.background = `linear-gradient(${gradientDeg}deg, ${color}, ${gradient})`;
      this.rollers[1].style.background = `linear-gradient(${gradientDeg}deg, ${color}, ${gradient})`;
    } if (isColor) {
      this.rollers[0].style.background = color;
      this.rollers[1].style.background = color;
    }
  }

  public moveRollersAtValue(options: IViewState): void {
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
      this.rollers[0].style.left = `${positionFrom}%`;
      this.rollers[1].style.left = `${positionTo}%`;
    } else {
      this.rollers[0].style.bottom = `${positionFrom}%`;
      this.rollers[1].style.bottom = `${positionTo}%`;
    }
    this.updataColor(options);
    this.updataOutTooltip(options);
  }

  public upData(options: IViewState) {
    this.moveRollersAtValue(options);
    this.toggleRollers(options);
    this.updataColor(options);
    this.updataOutTooltip(options);
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

  private toggleRollers(options: IViewState): void {
    const {
      isDouble,
    } = options;

    if (isDouble) {
      this.rollers[1].style.display = 'none';
    } else {
      this.rollers[1].style.display = 'block';
    }
  }
}

export {
  Rollers,
};
