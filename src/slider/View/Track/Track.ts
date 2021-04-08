import {
  IViewState,
} from '../../interfaces/interfaces';
import { correctSeparate } from '../../libs/correctSeparate';
import { classNames } from '../../libs/classNames';

class Track {
  constructor(options: IViewState) {
    this.create(options);
  }

  private create(options: IViewState) {
    const {
      slider,
    } = options;

    const track = document.createElement('div');
    track.className = classNames.track;
    slider.append(track);
    this.createOutElement(track, options);
  }

  private createOutElement(track: HTMLElement, options: IViewState) {
    const startValue = document.createElement('div');
    const endValue = document.createElement('div');

    startValue.className = classNames.trackOutStart;
    endValue.className = classNames.trackOutEnd;
    track.append(startValue);
    track.append(endValue);

    this.setStartEndTrackOut(startValue, endValue, options);
  }

  private setStartEndTrackOut(outStart: HTMLElement, outEnd: HTMLElement, options: IViewState) {
    const {
      min,
      max,
      from,
      to,
      minMax,
      fromTo,
      isTrackPostfix,
      isPrefix,
    } = options;

    let {
      trackPostfix,
    } = options;

    if (isTrackPostfix === false) {
      trackPostfix = '';
    }
    // настройки для постфикса

    if (minMax === true) {
      outStart.innerHTML = `${correctSeparate(min, options)}${trackPostfix}`;
      outEnd.innerHTML = `${correctSeparate(max, options)}${trackPostfix}`;
    }
    if (fromTo === true) {
      outStart.innerHTML = `${correctSeparate(from, options)}${trackPostfix}`;
      outEnd.innerHTML = `${correctSeparate(to, options)}${trackPostfix}`;
    }
    const isFromtoPrefix = fromTo === true && isPrefix === true;
    const isMinMaxPrefix = minMax === true && isPrefix === true;
    // настройки для префикса

    if (isMinMaxPrefix) {
      outStart.innerHTML = `${trackPostfix}${correctSeparate(min, options)}`;
      outEnd.innerHTML = `${trackPostfix}${correctSeparate(max, options)}`;
    }
    if (isFromtoPrefix) {
      outStart.innerHTML = `${trackPostfix}${correctSeparate(from, options)}`;
      outEnd.innerHTML = `${trackPostfix}${correctSeparate(to, options)}`;
    }
  }

  public upData(options: IViewState) {
    const {
      slider,
    } = options;

    const outStart = slider.querySelector('.js-slider__out-start')! as HTMLElement;
    const outEnd = slider.querySelector('.js-slider__out-end')! as HTMLElement;

    this.setStartEndTrackOut(outStart, outEnd, options);
  }
}

export {
  Track,
};
