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
import {
  IOptions,
  IViewState,
} from '../interfaces/interfaces';
import { classNames } from '../libs/classNames';

class View {
  public emitter: EventEmitter;

  public state: IViewState;

  public element: JQuery < HTMLElement >;

  public slider: HTMLElement;

  private bar: Bar;

  private rollers: Rollers;

  private scale: Scale;

  private track: Track;

  constructor(Options: IOptions, element: JQuery < HTMLElement >) {
    this.emitter = new EventEmitter();

    this.element = element;

    this.slider = this.createSlider(Options, element);
    this.state = this.init(Options);

    this.rollers = this.createRollers(this.state);
    this.bar = this.createBar(this.state);
    this.track = this.createTrack(this.state);
    this.scale = this.createScale(this.state);

    this.upData(this.state);

    this.bindEventListeners();
  }

  // * Расширяю Options до IViewState

  private init(Options: IOptions): IViewState {
    const size = this.getSliderSize(Options);
    const oneStep = this.getOneStep(Options);
    const {
      slider,
    } = this;

    return {
      ...Options,
      size,
      oneStep,
      slider,
    };
  }

  public createSlider(Options: IOptions, element: JQuery < HTMLElement >): HTMLElement {
    const {
      isVertical,
    } = Options;
    const slider = document.createElement('div');
    slider.className = classNames.slider;
    if (isVertical) slider.className = classNames.sliderVertical;

    element.append(slider);

    return slider;
  }

  private createTrack(Options: IViewState): Track {
    return new Track(Options);
  }

  private createBar(Options: IViewState): Bar {
    return new Bar(Options);
  }

  private createRollers(Options: IViewState): Rollers {
    return new Rollers(Options);
  }

  private createScale(Options: IViewState): Scale {
    return new Scale(Options);
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
    this.track.setOut(updataState);

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

  public getOneStep(Options: IOptions): number {
    const {
      min,
      max,
      step,
    } = Options;

    const result = Math.ceil((max - min) / step);

    return this.getSliderSize(Options) / result;
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
      isVertical,
    } = this.state;
    event.preventDefault();
    let mouseValue = 0;
    const regexp = /tooltip || roller/;
    const isHandle = !regexp.test(target.className);
    if (isHandle) return;
    const sensorHorizontalEvent = event.type === 'touchmove' && !isVertical;
    const mouseHorizontalEvent = event.type === 'mousemove' && !isVertical;
    const sensorVerticalEvent = event.type === 'touchmove' && isVertical;
    const mouseVerticalEvent = event.type === 'mousemove' && isVertical;

    if (sensorHorizontalEvent) {
      mouseValue = this.convertPxToValue(event.touches[0].clientX);
    }
    if (mouseHorizontalEvent) {
      mouseValue = this.convertPxToValue(event.clientX);
    }

    if (sensorVerticalEvent) {
      mouseValue = this.convertPxToValue(event.touches[0].clientY);
    } if (mouseVerticalEvent) {
      mouseValue = this.convertPxToValue(event.clientY);
    }

    this.updatePosition(mouseValue, target);
  }

  private getTargetType(target: HTMLElement): string {
    const rollers = this.slider.querySelectorAll(classNames.findRollers);

    if (rollers[0].contains(target)) return 'from';

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
      isVertical,
    } = this.state;
    const {
      target,
    } = event;
    let coordinate = 0;
    const regexp = /scale/;
    if (regexp.test(target.className)) return;

    if (!isVertical) {
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
      step, isDouble,
    } = this.state;

    const fromDistance = Math.abs(from - value);
    const toDistance = Math.abs(to - value);
    const isSingleFrom = isDouble && fromDistance;

    if (isSingleFrom) {
      this.emitter.emit('newPosition', {
        from: value,
      });
      this.convertValueToColor(value);
      return;
    }

    const isFrom = (fromDistance < toDistance) ? 'from' : 'to';
    const targetFrom = !target && isFrom === 'from';
    const targetTo = !target && isFrom === 'to';

    if (targetFrom) {
      this.emitter.emit('newPosition', {
        from: value,
      });
      this.convertValueToColor(value);
    } if (targetTo) {
      this.emitter.emit('newPosition', {
        to: value,
      });
      this.convertValueToColor(value);
    }

    const targets = target && this.getTargetType(target);

    const isFromTarget = targets === 'from' && !isDouble;
    const isToTarget = targets === 'to' && !isDouble;
    const correctFrom = isFromTarget && value > to - step;
    const correctTo = isToTarget && value < from + step;

    if (correctFrom) {
      this.emitter.emit('newPosition', {
        from: to - step,
      });
      return;
    }
    if (isFromTarget) {
      this.emitter.emit('newPosition', {
        from: value,
      });
      this.convertValueToColor(value);
    }
    if (correctTo) {
      this.emitter.emit('newPosition', {
        to: from + step,
      });
      return;
    }
    if (isToTarget) {
      this.emitter.emit('newPosition', {
        to: value,
      });
      this.convertValueToColor(value);
    }
  }

  public convertPxToValue(coordinate: number): number {
    const {
      min,
      max,
      step,
      oneStep,
      size,
      isVertical,
    } = this.state;
    const sliderPos = this.getSliderPosition();

    const sliderEndPos = sliderPos + size;

    let px = 0;
    if (!isVertical) {
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
    const isChangeColor = isColor && !changeColor;
    const isChangeNewColor = isColor && changeColor;
    let palitra = 0;
    let grPalitra = 0;
    if (isChangeColor) {
      palitra = Math.round(val * 255 * 255 * 255);
      grPalitra = Math.round(val * 255 * 254 * 254);
    } if (isChangeNewColor) {
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

  public getSliderPosition(): number {
    const {
      slider,
      isVertical,
    } = this.state;
    let position = 0;

    if (!isVertical) {
      position = slider.getBoundingClientRect().left;
    } else {
      position = slider.getBoundingClientRect().top;
    }

    return position;
  }

  public getSliderSize({ isVertical }: IOptions): number {
    let size = 0;
    if (!isVertical) {
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
