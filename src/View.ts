import { Options, ViewState } from './interfaces';
import { Observable } from './Observable';
import { Roller } from './Roller';
import { Track } from './Track';
import { Scale } from './Scale';
import { Bar } from './Bar';

class View {
  public observable: Observable;

  private state: ViewState;

  private slider: HTMLElement;

  private bar: Bar;

  private options: Options;

  private rollers: Roller;

  private scale: Scale;

  constructor(options: Options) {
    this.observable = new Observable();
    this.slider = this.createSlider(options);
    this.options = options
    this.state = this.init(options);

    this.scale = this.createScale(this.state);
    this.createTrack(this.state);
    this.rollers = this.createRollers(this.state);
    this.bar = this.createBar(this.state);

    this.upData(this.state);
    this.addEventListeners();
  }

  private init(options: Options): ViewState {
    const size = this.getSliderSize(options);
    const sliderPos = this.getSliderPosition(options);
    const oneStep = this.getOneStep(options);
    const { slider } = this;

    return {
      ...options, size, sliderPos, oneStep, slider,
    };
  }

  private getOneStep(options: Options): number {
    const { min, max, step } = options;

    const result = Math.ceil((max - min) / step);

    return this.getSliderSize(options) / result;
  }
private createTrack(options: ViewState): void {
    new Track(options);
  }

  private createBar(options: ViewState): Bar {
    return new Bar(options);
  }

  private createRollers(options: ViewState): Roller {
    return new Roller(options);
  }

  private createScale(options: ViewState): Scale {
    return new Scale(options);
  }

  private createSlider(options: Options): HTMLElement {
    const { selector, orientation } = options;
    const slider = document.createElement('div');

    slider.className = `slider slider_${orientation}`;
    document.querySelector(selector)!.append(slider);

    return slider;
  }
  public upData(newState: Partial<Options>): void {
  
    const { orientation } = newState;
    this.options.orientation = String(orientation)
    const sliderPos = this.getSliderPosition(this.options);

    const updatedState: ViewState = {
      ...this.state,
      ...newState,
      ...{ sliderPos },
    };


    this.rollers.updateState(updatedState);
    this.bar.updateState(updatedState);
    this.scale.updateState(updatedState);

    this.state = {
      ...updatedState,
    };
  }

  public upDateSlider() {
    this.slider.remove();
    this.slider = this.createSlider(this.state);
    this.state = this.init(this.state);
    this.rollers = this.createRollers(this.state);
    this.scale = this.createScale(this.state);
    this.createTrack(this.state);
    this.bar = this.createBar(this.state);
    this.upData(this.state);
    this.addEventListeners();
  }

  private addEventListeners() {
    const bindMouseDown = this.dragStart.bind(this);
    this.slider.addEventListener('touchstart', bindMouseDown);
    this.slider.addEventListener('mousedown', bindMouseDown);

    this.onTrackClick = this.onTrackClick.bind(this);
    this.slider.addEventListener('click', this.onTrackClick);

    this.onScaleClick = this.onScaleClick.bind(this);
    this.slider.addEventListener('scaleclick', this.onScaleClick);
  }

  private dragStart(event: any) {
    const { target } = event;

    if (this.getTargetType(target)) {
      const drag = this.drag.bind(this, target);

      const handleUp = () => {
        this.slider.removeEventListener('mousemove', drag);
        this.slider.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', handleUp);
        document.removeEventListener('touchend', handleUp);
      };

      this.slider.addEventListener('mousemove', drag);
      this.slider.addEventListener('touchmove', drag);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchend', handleUp);
    }
  }

  private drag(target: HTMLElement, event: any): void {
    const { orientation } = this.state;

    let mouseValue = 0;

    if (!/roller/.test(target.className)) return;

    if (orientation === 'horizontal') {
      if (event.type === 'touchmove') {
        mouseValue = this.convertPxToValue(event.touches[0].clientX);
      } else {
        mouseValue = this.convertPxToValue(event.clientX);
      }
    } else if (event.type === 'touchmove') {
      mouseValue = this.convertPxToValue(event.touches[0].clientY);
    } else {
      mouseValue = this.convertPxToValue(event.clientY);
    }
    this.updatePosition(mouseValue, target);
  }

  private getTargetType(target: HTMLElement): string {
    const rollers = this.slider.querySelectorAll('.slider__roller');

    if (rollers[0]) {
      if (rollers[0].contains(target)) return 'from';
    }
    if (rollers[1].contains(target)) {
      return 'to';
    }
    return 'undefined';
  }

  private onScaleClick(event: any): void {
    const { value } = event.detail;
    this.updatePosition(value);
  }

  private onTrackClick(event: any): void {
    event.preventDefault();
    const { target } = event;
    const { orientation } = this.state;

    if (!/track|bar/.test(target.className)) return;
    let coordinate = 0;
    if (orientation === 'horizontal') {
      coordinate = event.clientX;
    } else {
      coordinate = event.clientY;
    }
    const value = this.convertPxToValue(coordinate);
    this.updatePosition(value);
  }

  private updatePosition(value: number, target?: HTMLElement): void {
    const { from, to, type, step} = this.state;

    const fromDistance = Math.abs(from - value);
    const toDistance = Math.abs(to - value);
    const isSingle = type === 'single';

    if (isSingle && fromDistance) {
      this.observable.notify('newPosition', { from: value });

      return;
    }

    if (!target) {
      const isFrom = (fromDistance < toDistance) ? 'from' : 'to';

      if (isFrom === 'from') {
        this.observable.notify('newPosition', { from: value });
      } else {
        this.observable.notify('newPosition', { to: value });
      }
    } else {
      const targets = this.getTargetType(target);
      if (targets === 'from') {
       if (value > to - step) value = from ;
        this.observable.notify('newPosition', { from: value });
      } else {
        if (value < from + step) value = to ;
        this.observable.notify('newPosition', { to: value });
      }
    }
  }

  private convertPxToValue(coordinate: number): number {
    const {
      min, max, step, oneStep, size, orientation
    } = this.state;
    
const sliderPos = this.getSliderPosition(this.options);

    const sliderEndPos = sliderPos + size;

    let px = 0;
    if (orientation === 'horizontal') {
      px = coordinate - sliderPos;
    } else {
      px = sliderEndPos - coordinate;
    }
    if (px > size) return max;

    if (px < 0) return min;

    const value = Math.round(px / oneStep) * step + min;

    return value;
  }

  private getSliderPosition(options: Options): number {
    const { orientation } = options;
    let position = 0;

    if (orientation === 'horizontal') {
      position = this.slider.getBoundingClientRect().left;
    } else {
      position = this.slider.getBoundingClientRect().top;
    }

    return position;
  }

  private getSliderSize(options: Options): number {
    const { orientation } = options;
    let size = 0;
    if (orientation === 'horizontal') {
      size = this.slider.getBoundingClientRect().width;
    } else {
      size = this.slider.getBoundingClientRect().height;
    }
    return size;
  }
}

export { View };
