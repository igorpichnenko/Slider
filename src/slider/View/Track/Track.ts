import { ViewState } from '../../interfaces/interfaces';

class Track {
  constructor(options: ViewState) {
    this.create(options);
  }

  private create(options: ViewState) {
    const { slider, orientation } = options;

    const track = document.createElement('div');

    track.className = `slider__track slider__track_${orientation}`;

    slider.append(track);
    this.createOutElement(track, options);
  }

  private createOutElement(track: HTMLElement, options: ViewState) {
    const { orientation } = options;
    const startValue = document.createElement('div');
    const endValue = document.createElement('div');
    startValue.className = `slider__out slider__out-start slider__out-start_${orientation}`;
    endValue.className = `slider__out slider__out-end slider__out-end_${orientation}`;
    track.append(startValue);
    track.append(endValue);

    this.setStartEndTrackOut(startValue, endValue, options);
  }

  private setStartEndTrackOut(outStart: HTMLElement, outEnd: HTMLElement, options: ViewState) {
    const {
      min, max, from, to, minMax, fromTo, isTrackPostfix, isPrefix,
    } = options;

    let { trackPostfix } = options;

    if (isTrackPostfix === false) {
      trackPostfix = '';
    }
    // настройки для постфикса

    if (minMax === true) {
      outStart.innerHTML = `${this.separate(min, options)}${trackPostfix}`;
      outEnd.innerHTML = `${this.separate(max, options)}${trackPostfix}`;
    }
    if (fromTo === true) {
      outStart.innerHTML = `${this.separate(from, options)}${trackPostfix}`;
      outEnd.innerHTML = `${this.separate(to, options)}${trackPostfix}`;
    }

    // настройки для префикса
    if (isPrefix === true) {
      if (minMax === true) {
        outStart.innerHTML = `${trackPostfix}${this.separate(min, options)}`;
        outEnd.innerHTML = `${trackPostfix}${this.separate(max, options)}`;
      }
      if (fromTo === true) {
        outStart.innerHTML = `${trackPostfix}${this.separate(from, options)}`;
        outEnd.innerHTML = `${trackPostfix}${this.separate(to, options)}`;
      }
    }
  }

  private separate(value: number, options: ViewState): string {
    const { isSeparate } = options;
    let { separate } = options;
    let val = '';

    if (isSeparate === false) {
      val = value.toString();
    } else {
      if (separate === ',') {
        separate = 'en-US';
      }
      if (separate === '.') {
        separate = 'de-DE';
      }
      if (separate === ' ') {
        separate = undefined;
      }
      val = value.toLocaleString(separate);
    }
    return val;
  }

  public upData(options: ViewState) {
    const { slider } = options;

    const outStart = slider.querySelector('.slider__out-start')! as HTMLElement;
    const outEnd = slider.querySelector('.slider__out-end')! as HTMLElement;

    this.setStartEndTrackOut(outStart, outEnd, options);
  }
}

export { Track };
