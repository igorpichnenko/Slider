import {
  IViewState,
} from '../../interfaces/interfaces';
import { correctSeparate } from '../../libs/correctSeparate';
import { classNames } from '../../libs/classNames';

class Scale {
  private options: IViewState;

  constructor(options: IViewState) {
    this.create(options);
    this.options = options;
  }

  private create(options: IViewState): void {
    const {
      slider,
    } = options;
    const scale = document.createElement('div');
    scale.className = classNames.scale;
    slider.append(scale);
    this.addEventListeners(scale);
    this.addScaleMarker(options, scale);
    this.checkScale(options, scale);
  }

  public upData(options: IViewState) {
    const {
      slider,
    } = options;
    const scale = slider.querySelector('.js-slider__scale')! as HTMLElement;

    this.options = {
      ...this.options,
      ...options,
    };

    this.checkScale(options, scale);
    this.updataScaleMarker(options);
  }

  private updataScaleMarker(options: IViewState) {
    const {
      onlyDivisions,
      slider,
      color,
    } = options;

    const scaleMarkers = slider.querySelectorAll < HTMLElement >('.js-slider__scale-value')!;

    scaleMarkers.forEach((scaleMarker) => {
      if (onlyDivisions === true) {
        scaleMarker.classList.add(classNames.scaleFsZero);
      } else {
        scaleMarker.classList.add(classNames.scaleFsNormal);
      }
    });
    document.documentElement.style.setProperty('--scale-color',
      ` ${color}`);
  }

  private checkScale(options: IViewState,
    scale: HTMLElement) {
    const {
      isScale,
    } = options;
    if (isScale === false) {
      scale.style.display = 'none';
    } if (isScale === true) {
      scale.style.display = '';
    }
  }

  private addEventListeners(scale: HTMLElement) {
    this.handleScaleClick = this.handleScaleClick.bind(this);
    scale.addEventListener('click', this.handleScaleClick);
  }

  private addScaleMarker(options: IViewState, scale: HTMLElement): void {
    const {
      min,
      max,
      step,
      size,
      oneStep,
    } = options;

    const inc = this.getIncrement(options);
    const pxInc = (inc / step) * oneStep;
    const fragment = document.createDocumentFragment();

    let pxCurrent = 0;
    let i = 0;
    for (let current = min; current < max; current += inc, i += 1) {
      if (pxCurrent > size - 50) break;
      const parameters = {
        fragment, value: current, position: pxCurrent, options, val: i,
      };
      this.createScaleMarker(parameters);

      pxCurrent += pxInc;
    }
    const newParam = {
      fragment, value: max, position: size, options, val: 5,
    };

    this.createScaleMarker(newParam);

    scale.append(fragment);
  }

  public getIncrement(options: IViewState): number {
    const {
      size,
      oneStep,
      step,
    } = options;
    const value = Math.ceil(size / oneStep);
    const inc = Math.ceil(value / 5) * step;
    return inc;
  }

  private createScaleMarker({
    fragment, value, position, options, val,
  }: {fragment: DocumentFragment,
    value: number, position: number, options: IViewState, val: number}): void {
    const {
      isScalePostfix,
      isPrefix,
      onlyDivisions, isVertical,
    } = options;

    let {
      scalePostfix,
    } = options;

    const scaleMarker = document.createElement('span');
    scaleMarker.className = classNames.scaleMarker;
    const divisionValue = document.createElement('span');
    const division = document.createElement('span');
    divisionValue.className = `${classNames.divisionValue} slider__division-value_${val}-element`;

    division.className = classNames.division;
    scaleMarker.append(divisionValue);
    scaleMarker.append(division);

    fragment.append(scaleMarker);

    let element = divisionValue;

    if (onlyDivisions === false) {
      element = scaleMarker;
    }

    if (isScalePostfix === false) {
      scalePostfix = '';
    }
    element.innerHTML = `${correctSeparate(value, options)}${scalePostfix}`;

    if (isPrefix === true) {
      element.innerHTML = `${scalePostfix}${correctSeparate(value, options)}`;
    }

    this.updataScaleMarker(options);

    const offset = this.convertPxToPercent(position, options);

    if (!isVertical) {
      scaleMarker.style.left = `${offset}%`;
    } else {
      scaleMarker.style.bottom = `${offset}%`;
    }
  }

  public convertPxToPercent(value: number, options: IViewState): number {
    const {
      size,
    } = options;
    return (value * 100) / size;
  }

  // Кастомный Эвент для передачи значения в Вид

  private handleScaleClick(event: Event): void {
    const {
      target,
    } = event;
    const {
      onlyDivisions,
    } = this.options;
    event.stopPropagation();

    if (!(target instanceof HTMLElement)) return;
    const isScaleDivison = !target.classList.contains('slider__division-value') && onlyDivisions === true;

    const isScaleValue = !target.classList.contains('slider__scale-value') && onlyDivisions === false;

    if (isScaleDivison) return;
    if (isScaleValue) return;

    const value = target.innerHTML;

    const scaleEvent = new CustomEvent('scaleclick', {
      bubbles: true,
      detail: {
        event, value,
      },
    });
    target.dispatchEvent(scaleEvent);
  }
}
export {
  Scale,
};
