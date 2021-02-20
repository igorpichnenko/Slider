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
    const startValue = document.createElement('div');
    const endValue = document.createElement('div');
    startValue.className = 'slider__out slider__out_start';
    endValue.className = 'slider__out slider__out_end';
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
      outStart.innerText = `${min.toLocaleString()}${trackPrefix}`;
      outEnd.innerText = `${max.toLocaleString()}${trackPrefix}`;
    }
    if (fromTo === true) {
      outStart.innerText = `${from.toLocaleString()}${trackPrefix}`;
      outEnd.innerText = `${to.toLocaleString()}${trackPrefix}`;
    }
  }

  public upData(options: ViewState) {
    const { slider } = options;

    const outStart = slider.querySelector('.slider__out_start')! as HTMLElement;
    const outEnd = slider.querySelector('.slider__out_end')! as HTMLElement;

    this.setStartEndTrackOut(outStart, outEnd, options);
  }
}

export { Track };
