import {
  Options,
  ViewState,
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

  public state: ViewState;

  public element: JQuery < HTMLElement >;

  public slider: HTMLElement;

  private bar: Bar;

  private rollers: Rollers;

  private scale: Scale;

  private track: Track;

  constructor(options: Options, element: JQuery < HTMLElement >) {
    this.emitter = new EventEmitter();

    this.element = element;

    this.slider = this.createSlider(options, element);
    this.state = this.init(options);

    this.rollers = this.createRollers(this.state);
    this.bar = this.createBar(this.state);
    this.track = this.createTrack(this.state);
    this.scale = this.createScale(this.state);

    this.upData(this.state);

    this.bindEventListeners();
  }

  // * Расширяю Options до ViewState

  private init(options: Options): ViewState {
    const size = this.getSliderSize(options);
    const oneStep = this.getOneStep(options);
    const {
      slider,
    } = this;

    return {
      ...options,
      size,
      oneStep,
      slider,
    };
  }

  public createSlider(options: Options, element: JQuery < HTMLElement >): HTMLElement {
    const {
      orientation,
    } = options;
    const slider = document.createElement('div');

    slider.className = `slider slider_${orientation}`;
    element.append(slider);

    return slider;
  }

  private createTrack(options: ViewState): Track {
    return new Track(options);
  }

  private createBar(options: ViewState): Bar {
    return new Bar(options);
  }

  private createRollers(options: ViewState): Rollers {
    return new Rollers(options);
  }

  private createScale(options: ViewState): Scale {
    return new Scale(options);
  }

  /**
  * Обновляю стостояние View
  * Обновляю состояние всех подвидов
  * */
  public upData(newState: Partial < ViewState >) {
    const updataState: ViewState = {
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

  public getOneStep(options: Options): number {
    const {
      min,
      max,
      step,
    } = options;

    const result = Math.ceil((max - min) / step);

    return this.getSliderSize(options) / result;
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

    if (orientation === 'horizontal') {
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
    const isSingle = type === 'single';

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
        if (type === 'double') {
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

    if (orientation === 'horizontal') {
      position = slider.getBoundingClientRect().left;
    } else {
      position = slider.getBoundingClientRect().top;
    }

    return position;
  }

  public getSliderSize(options: Options): number {
    const {
      orientation,
    } = options;
    let size = 0;
    if (orientation === 'horizontal') {
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
