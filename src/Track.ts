import { ViewState } from './interfaces';

class Track {
  constructor(options: ViewState) {
    this.create(options);
  }

  private create(options: ViewState) {
    const { orientation, slider } = options;
    const track = document.createElement('div');

    track.className = `slider__track slider__track_${orientation}`;

    slider.append(track);
  }
}

export { Track };
