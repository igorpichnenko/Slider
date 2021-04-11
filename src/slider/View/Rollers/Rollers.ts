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

  private create({ slider }: IViewState) {
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
    const { rollers } = this;
    const [firstRoller, secondRoller] = rollers;

    firstRoller.append(firstTooltip);
    secondRoller.append(secondTooltip);

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
    const { tooltips } = this;
    const [firstTooltip, secondTooltip] = tooltips;
    if (!isPostfix) {
      postfix = '';
    }

    const isSetPrefix = isLabel && isPrefix;
    const isSetPostfix = isLabel && !isPrefix;
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

    this.setColor(options);
  }

  private setColor({
    color, gradient, isColorOut, allColors, isChangeColor, isLabel,
  }: IViewState) {
    /**
    * Задумка сделать обратный конвектор из 16-ричного в обычный вид, например #fff в
    white, и в дальнейшем собирался дополнять перевод
    * */
    let newColor = allColors[color];
    let newGradient = allColors[gradient];

    if (!newGradient) {
      newGradient = gradient;
    }

    if (!newColor) {
      newColor = color;
    }
    const { tooltips } = this;
    const [firstTooltip, secondTooltip] = tooltips;
    const setNewColor = isChangeColor && isColorOut;

    if (setNewColor) {
      firstTooltip.innerHTML = String(newColor);
      secondTooltip.innerHTML = String(newGradient);

      firstTooltip.style.backgroundColor = `${color}`;
      secondTooltip.style.backgroundColor = `${gradient}`;
      firstTooltip.classList.add(classNames.tooltipWhite);
      secondTooltip.classList.add(classNames.tooltipWhite);
    }

    if (!isLabel) {
      firstTooltip.classList.add(classNames.notVisible);
      secondTooltip.classList.add(classNames.notVisible);
    }
  }

  private updataColor({
    color, isGradient, gradient, isChangeColor, gradientDeg,
  }: IViewState) {
    const { rollers } = this;
    const [firstRoller, secondRoller] = rollers;
    const isChangeGradient = isChangeColor && isGradient;
    const isColor = isChangeColor && !isGradient;

    if (isChangeGradient) {
      firstRoller.style.background = `linear-gradient(${gradientDeg}deg, ${color}, ${gradient})`;
      secondRoller.style.background = `linear-gradient(${gradientDeg}deg, ${color}, ${gradient})`;
    } if (isColor) {
      firstRoller.style.background = color;
      secondRoller.style.background = color;
    }
  }

  public moveRollersAtValue(options: IViewState): void {
    const {
      to,
      from,
      isVertical,
    } = options;
    const { rollers } = this;
    const [firstRoller, secondRoller] = rollers;
    const pxTo = this.convertValueToPx(to, options);
    const pxFrom = this.convertValueToPx(from, options);

    const positionTo = this.convertPxToProcent(pxTo, options);
    const positionFrom = this.convertPxToProcent(pxFrom, options);

    if (!isVertical) {
      firstRoller.style.left = `${positionFrom}%`;
      secondRoller.style.left = `${positionTo}%`;
    } else {
      firstRoller.style.bottom = `${positionFrom}%`;
      secondRoller.style.bottom = `${positionTo}%`;
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

  private toggleRollers({ isDouble }: IViewState): void {
    const { rollers } = this;
    const [firstRoller, secondRoller] = rollers;
    if (isDouble) {
      firstRoller.classList.add(classNames.notVisible);
    } else {
      secondRoller.classList.remove(classNames.notVisible);
    }
  }
}

export {
  Rollers,
};
