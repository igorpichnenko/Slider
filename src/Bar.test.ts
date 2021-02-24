import '@testing-library/jest-dom';
import { allColors } from './color';
import { View } from './View';
import { Options } from './interfaces';

describe('Bar', () => {
  let wrap: HTMLElement;
  let view: View;
  const standardOptions: Options = {
    orientation: 'horizontal',
    type: 'double',
    min: 0,
    max: 10,
    step: 1,
    from: 3,
    to: 7,
    prefix: '₽',
    isPrefix: true,
    isLabel: true,
    isScale: true,
    color: 'orange',
    isScalePrefix: true,
    scalePrefix: '₽',
    minMax: false,
    fromTo: false,
    isTrackPrefix: true,
    trackPrefix: '₽',
    isColor: true,
    changeColor: true,
    isGradient: true,
    gradient: 'purple',
    gradientDeg: 45,
    isColorOut: false,
    onlyDivisions: false,
    allColors,
  };

  beforeEach(() => {
    wrap = document.createElement('div');
    wrap.className = 'js-toxin-slider';
    document.body.append(wrap);
    view = new View(standardOptions, wrap);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('bar horizontal is initialized and visible visible', () => {
    const bar = view.slider.querySelector('.slider__bar');

    expect(bar).toBeVisible();
  });

  test('if isGradient = false then the background of the bar must be the color of the variable', () => {
    const bar = view.slider.querySelector('.slider__bar') as HTMLElement;

    view.upData({ isGradient: false });

    expect(bar.style.background).toBe(view.state.color);
  });

  test('if the orientation is "vertical" bar should have a vertical modifier', () => {
    const newOptions = {
      ...standardOptions,
      orientation: 'vertical',
    };

    const newView = new View(newOptions, wrap);

    const bar = newView.slider.querySelector('.slider__bar_vertical');

    expect(bar).toBeVisible();
  });
});
