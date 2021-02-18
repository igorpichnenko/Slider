import { ViewState } from './interfaces';

class Scale {
  constructor(options: ViewState) {
    this.create(options);
  }

  private create(options: ViewState): void {
    const { slider, orientation } = options;
    const scale = document.createElement('div');
    scale.className = `slider__scale slider__scale_${orientation}`;

    slider.append(scale);

    this.addEventListeners(scale);
    this.addScaleMarker(options, scale);
    this.checkScale(options, scale);
  }

  public updateState(options: ViewState) {
    const { slider } = options;
    const scale = slider.querySelector('.slider__scale')! as HTMLElement;

    this.checkScale(options, scale);
    this.updateScaleMarker(options);
  }

  private updateScaleMarker(options: ViewState) {
    const { scalePrefix, isScalePrefix, slider } = options;
    const scaleMarkers = slider.querySelectorAll('.slider__scale-value')! as NodeListOf<Element>;

    scaleMarkers.forEach((scaleMarker) => {
      if (isScalePrefix === true) {
        scaleMarker.setAttribute('data-text', `${scalePrefix}`);
      } else {
        scaleMarker.setAttribute('data-text', '');
      }
    });
  }

  private checkScale(options: ViewState, scale: HTMLElement) {
    const { isScale } = options;
    if (isScale === false) {
      scale.style.display = 'none';
    } if (isScale === true) {
      scale.style.display = '';
    }
  }

  private addEventListeners(scale: HTMLElement) {
    this.onScaleClick = this.onScaleClick.bind(this);
    scale.addEventListener('click', this.onScaleClick);
  }

  private addScaleMarker(options: ViewState, scale: HTMLElement): void {
    const {
      min, max, step, size, oneStep,
    } = options;

    const inc = this.getIncrement(options);
    const pxInc = (inc / step) * oneStep;
    const fragment = document.createDocumentFragment();

    let pxCurrent = 0;

    for (let current = min; current < max; current += inc) {
      if (pxCurrent > size - 50) break;
      this.createScaleMarker(fragment, current, pxCurrent, options);

      pxCurrent += pxInc;
    }

    this.createScaleMarker(fragment, max, size, options);

    scale.append(fragment);
  }

  private getIncrement(options: ViewState): number {
    const { size, oneStep, step } = options;
    const value = Math.ceil(size / oneStep);
    const inc = Math.ceil(value / 5) * step;
    return inc;
  }

  private createScaleMarker(fragment: DocumentFragment,
    value: number, position: number, options: ViewState): void {
    const { orientation } = options;
    const scaleMarker = document.createElement('span');
    scaleMarker.className = `slider__scale-value slider__scale-value_${orientation}`;
    fragment.append(scaleMarker);
    
    scaleMarker.innerHTML = value.toString();
    this.updateScaleMarker(options);

    const offset = this.convertPxToPercent(position, options);
    if (orientation === 'horizontal') {
      scaleMarker.style.left = `${offset}%`;
    } else {
      scaleMarker.style.bottom = `${offset}%`;
    }
  }

  private convertPxToPercent(value: number, options: ViewState): number {
    const { size } = options;
    return (value * 100) / size;
  }

  private onScaleClick(event: Event): void {
    const { target } = event;

    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains('slider__scale-value')) return;

    const value = Number(target.innerHTML);

    const scaleEvent = new CustomEvent('scaleclick', { bubbles: true, detail: { event, value } });
    target.dispatchEvent(scaleEvent);
  }
}
export { Scale };
