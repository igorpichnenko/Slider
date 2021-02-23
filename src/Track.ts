import { ViewState } from './interfaces';

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
      min, max, from, to, minMax, fromTo, isTrackPrefix,
    } = options;
    let { trackPrefix } = options;
    if (isTrackPrefix === false) {
      trackPrefix = '';
    }

    if (minMax === true) {
      outStart.innerHTML = `${min.toLocaleString()}${trackPrefix}`;
      outEnd.innerHTML = `${max.toLocaleString()}${trackPrefix}`;
    }
    if (fromTo === true) {
      outStart.innerHTML = `${from.toLocaleString()}${trackPrefix}`;
      outEnd.innerHTML = `${to.toLocaleString()}${trackPrefix}`;
    }
  }

  public upData(options: ViewState) {
    const { slider } = options;

    const outStart = slider.querySelector('.slider__out-start')! as HTMLElement;
    const outEnd = slider.querySelector('.slider__out-end')! as HTMLElement;

    this.setStartEndTrackOut(outStart, outEnd, options);
  }
}

export { Track };
