import {
  IOptions,
  IViewState, Orientation, SliderType,
} from '../interfaces/interfaces';
import {
  EventEmitter,
} from '../EventEmitter/EventEmitter';
import {
  Rollers,
} from './Rollers/Rollers';
import {
  Track,
} from './Track/Track';
import {
  Scale,
} from './Scale/Scale';
import {
  Bar,
} from './Bar/Bar';

class View {
  public emitter: EventEmitter;

  public state: IViewState;

  public element: JQuery < HTMLElement >;

  public slider: HTMLElement;

  private bar: Bar;

  private rollers: Rollers;

  private scale: Scale;

  private track: Track;

  constructor(IOptions: IOptions, element: JQuery < HTMLElement >) {
    this.emitter = new EventEmitter();

    this.element = element;

    this.slider = this.createSlider(IOptions, element);
    this.state = this.init(IOptions);

    this.rollers = this.createRollers(this.state);
    this.bar = this.createBar(this.state);
    this.track = this.createTrack(this.state);
    this.scale = this.createScale(this.state);

    this.upData(this.state);

    this.bindEventListeners();
  }

  // * Расширяю IOptions до IViewState

  private init(IOptions: IOptions): IViewState {
    const size = this.getSliderSize(IOptions);
    const oneStep = this.getOneStep(IOptions);
    const {
      slider,
    } = this;

    return {
      ...IOptions,
      size,
      oneStep,
      slider,
    };
  }

  public createSlider(IOptions: IOptions, element: JQuery < HTMLElement >): HTMLElement {
    const {
      orientation,
    } = IOptions;
    const slider = document.createElement('div');

    slider.className = `slider slider_${orientation}`;
    element.append(slider);

    return slider;
  }

  private createTrack(IOptions: IViewState): Track {
    return new Track(IOptions);
  }

  private createBar(IOptions: IViewState): Bar {
    return new Bar(IOptions);
  }

  private createRollers(IOptions: IViewState): Rollers {
    return new Rollers(IOptions);
  }

  private createScale(IOptions: IViewState): Scale {
    return new Scale(IOptions);
  }

  /**
  * Обновляю стостояние View
  * Обновляю состояние всех подвидов
  * */
  public upData(newState: Partial < IViewState >) {
    const updataState: IViewState = {
      ...this.state,
      ...newState,
    };

    this.rollers.upData(updataState);
    this.bar.upData(updataState);
    this.scale.upData(updataState);
    this.track.upData(updataState);

    this.state = {
      ...updataState,
    };
  }

  // Метод пересборки слайдера, им управляет Презентер

  public upDataSlider() {
    this.slider.remove();
    this.slider = this.createSlider(this.state, this.element);
    this.state = this.init(this.state);
    this.rollers = this.createRollers(this.state);
    this.scale = this.createScale(this.state);
    this.track = this.createTrack(this.state);
    this.bar = this.createBar(this.state);
    this.upData(this.state);
    this.bindEventListeners();
  }

  public getOneStep(IOptions: IOptions): number {
    const {
      min,
      max,
      step,
    } = IOptions;

    const result = Math.ceil((max - min) / step);

    return this.getSliderSize(IOptions) / result;
  }

  private bindEventListeners() {
    this.handleTrackClick = this.handleTrackClick.bind(this);
    this.handleScaleClick = this.handleScaleClick.bind(this);
    this.addEventListeners();
  }

  private addEventListeners() {
    const handleSliderDrag = this.dragStart.bind(this);
    this.slider.addEventListener('touchstart', handleSliderDrag);
    this.slider.addEventListener('mousedown', handleSliderDrag);

    this.slider.addEventListener('click', this.handleTrackClick);
    this.slider.addEventListener('scaleclick', this.handleScaleClick);
  }

  private dragStart(event: MouseEvent | TouchEvent) {
    const target = event.target as HTMLElement;

    if (this.getTargetType(target)) {
      const drag = this.drag.bind(this, target);

      const handleUp = () => {
        document.removeEventListener('mousemove', drag);
        target.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', handleUp);
        target.removeEventListener('touchend', handleUp);
      };

      document.addEventListener('mousemove', drag);
      target.addEventListener('touchmove', drag);
      document.addEventListener('mouseup', handleUp);
      target.addEventListener('touchend', handleUp);
    }
  }

  private drag(target: HTMLElement, event: any) {
    const {
      orientation,
    } = this.state;
    event.preventDefault();
    let mouseValue = 0;

    if (!/tooltip || roller/.test(target.className)) return;

    if (orientation === Orientation[1]) {
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
    const rollers = this.slider.querySelectorAll('.js-slider__roller');

    if (rollers[0]) {
      if (rollers[0].contains(target)) return 'from';
    }
    if (rollers[1].contains(target)) {
      return 'to';
    }
    return 'undefined';
  }

  private handleScaleClick(event: any): void {
    const {
      scalePostfix,
    } = this.state;
    let {
      separate,
    } = this.state;
    const {
      value,
    } = event.detail;

    let position = 0;

    if (separate === ' ') {
      separate = '&nbsp;';
    }

    const del = value.split(scalePostfix).join('');

    position = del.split(separate).join('');

    const result = String(position).split(',').join('.');

    this.updatePosition(Number(result));
  }

  private handleTrackClick(event: any): void {
    const {
      orientation,
    } = this.state;
    const {
      target,
    } = event;
    let coordinate = 0;

    if (/scale/.test(target.className)) return;

    if (orientation === Orientation[1]) {
      coordinate = event.clientX;
    } else {
      coordinate = event.clientY;
    }
    const value = this.convertPxToValue(coordinate);
    this.updatePosition(value);
  }

  public updatePosition(value: number, target?: HTMLElement): void {
    const {
      from,
      to,
      type,
      step,
    } = this.state;

    const fromDistance = Math.abs(from - value);
    const toDistance = Math.abs(to - value);
    const isSingle = type === SliderType[1];

    if (isSingle && fromDistance) {
      this.emitter.emit('newPosition', {
        from: value,
      });
      this.convertValueToColor(value);
      return;
    }

    if (!target) {
      const isFrom = (fromDistance < toDistance) ? 'from' : 'to';

      if (isFrom === 'from') {
        this.emitter.emit('newPosition', {
          from: value,
        });
        this.convertValueToColor(value);
      } else {
        this.emitter.emit('newPosition', {
          to: value,
        });
        this.convertValueToColor(value);
      }
    } else {
      const targets = this.getTargetType(target);
      if (targets === 'from') {
        if (type === SliderType[0]) {
          if (value > to - step) {
            this.emitter.emit('newPosition', {
              from: to - step,
            });
            return;
          }
        }
        this.emitter.emit('newPosition', {
          from: value,
        });

        this.convertValueToColor(value);
      } else {
        if (value < from + step) {
          this.emitter.emit('newPosition', {
            to: from + step,
          });
          return;
        }

        this.emitter.emit('newPosition', {
          to: value,
        });
        this.convertValueToColor(value);
      }
    }
  }

  public convertPxToValue(coordinate: number): number {
    const {
      min,
      max,
      step,
      oneStep,
      size,
      orientation,
    } = this.state;
    const sliderPos = this.getSliderPosition();

    const sliderEndPos = sliderPos + size;

    let px = 0;
    if (orientation === Orientation[1]) {
      px = coordinate - sliderPos;
    } else {
      px = sliderEndPos - coordinate;
    }
    if (px > size) return max;

    if (px < 0) return min;

    const value = Math.round(px / oneStep) * step + min;

    return value;
  }

  /**
  * Вычесляем новый цвет в зависимости от положения бегунков
  * Переводим value в 16-ричный формат
  * */

  public convertValueToColor(value: number) {
    let {
      color,
      gradient,
    } = this.state;

    const {
      max,
      isColor,
      changeColor,
    } = this.state;

    const val = value / max;

    if (isColor === true) {
      let palitra = 0;
      let grPalitra = 0;
      if (changeColor === false) {
        palitra = Math.round(val * 255 * 255 * 255);
        grPalitra = Math.round(val * 255 * 254 * 254);
      } else {
        palitra = Math.round(val * 256 * 256 * 255);
        grPalitra = Math.round(val * 254 * 254 * 254);
      }
      const correctGradient = Math.abs(grPalitra);
      const correct = Math.abs(palitra);
      const setColor = correct.toString(16);
      const setGradient = correctGradient.toString(16);

      color = `#${setColor}`;
      gradient = `#${setGradient}`;

      this.emitter.emit('newPosition', {
        color,
      });
      this.emitter.emit('newPosition', {
        gradient,
      });
    }
  }

  public getSliderPosition(): number {
    const {
      orientation,
      slider,
    } = this.state;
    let position = 0;

    if (orientation === Orientation[1]) {
      position = slider.getBoundingClientRect().left;
    } else {
      position = slider.getBoundingClientRect().top;
    }

    return position;
  }

  public getSliderSize(IOptions: IOptions): number {
    const {
      orientation,
    } = IOptions;
    let size = 0;
    if (orientation === Orientation[1]) {
      size = this.slider.getBoundingClientRect().width;
    } else {
      size = this.slider.getBoundingClientRect().height;
    }
    return size;
  }
}

export {
  View,
};
