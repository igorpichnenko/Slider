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

  private create(options: IViewState) {
    const {
      slider,
    } = options;

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

    if (isTrackPostfix === false) {
      trackPostfix = '';
    }
    // настройки для постфикса

    if (minMax === true) {
      this.outElements[0].innerHTML = `${correctSeparate(min, options)}${trackPostfix}`;
      this.outElements[1].innerHTML = `${correctSeparate(max, options)}${trackPostfix}`;
    }
    if (fromTo === true) {
      this.outElements[0].innerHTML = `${correctSeparate(from, options)}${trackPostfix}`;
      this.outElements[1].innerHTML = `${correctSeparate(to, options)}${trackPostfix}`;
    }
    const isFromtoPrefix = fromTo === true && isPrefix === true;
    const isMinMaxPrefix = minMax === true && isPrefix === true;
    // настройки для префикса

    if (isMinMaxPrefix) {
      this.outElements[0].innerHTML = `${trackPostfix}${correctSeparate(min, options)}`;
      this.outElements[1].innerHTML = `${trackPostfix}${correctSeparate(max, options)}`;
    }
    if (isFromtoPrefix) {
      this.outElements[0].innerHTML = `${trackPostfix}${correctSeparate(from, options)}`;
      this.outElements[1].innerHTML = `${trackPostfix}${correctSeparate(to, options)}`;
    }
  }
}

export {
  Track,
};
