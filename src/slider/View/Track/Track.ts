import {
  IViewState,
} from '../../interfaces/interfaces';
import { correctSeparate } from '../../libs/correctSeparate';
import { classNames } from '../../libs/classNames';

class Track {
  track: HTMLElement;

  outElements: HTMLElement [];

  constructor(options: IViewState) {
    this.track = this.create(options);
    this.outElements = this.createOutElements();
    this.setOut(options);
  }

  private create({ slider }: IViewState) {
    const track = document.createElement('div');
    track.className = classNames.track;
    slider.append(track);

    return track;
  }

  private createOutElements() {
    const startValue = document.createElement('div');
    const endValue = document.createElement('div');

    startValue.className = classNames.trackOutStart;
    endValue.className = classNames.trackOutEnd;
    this.track.append(startValue);
    this.track.append(endValue);

    return [startValue, endValue];
  }

  public setOut(options: IViewState) {
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

    if (!isTrackPostfix) {
      trackPostfix = '';
    }
    // настройки для постфикса
    const { outElements } = this;
    const [trackOutStart, trackOutEnd] = outElements;

    if (minMax) {
      trackOutStart.innerHTML = `${correctSeparate(min, options)}${trackPostfix}`;
      trackOutEnd.innerHTML = `${correctSeparate(max, options)}${trackPostfix}`;
    }
    if (fromTo) {
      trackOutStart.innerHTML = `${correctSeparate(from, options)}${trackPostfix}`;
      trackOutEnd.innerHTML = `${correctSeparate(to, options)}${trackPostfix}`;
    }
    const isFromtoPrefix = fromTo && isPrefix;
    const isMinMaxPrefix = minMax && isPrefix;
    // настройки для префикса

    if (isMinMaxPrefix) {
      trackOutStart.innerHTML = `${trackPostfix}${correctSeparate(min, options)}`;
      trackOutEnd.innerHTML = `${trackPostfix}${correctSeparate(max, options)}`;
    }
    if (isFromtoPrefix) {
      trackOutStart.innerHTML = `${trackPostfix}${correctSeparate(from, options)}`;
      trackOutEnd.innerHTML = `${trackPostfix}${correctSeparate(to, options)}`;
    }
  }
}

export {
  Track,
};
