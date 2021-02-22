import '@testing-library/jest-dom';
import { allColors } from './color';
import { View } from './View';
import { Options } from './interfaces';

describe('Bar', () => {
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

  const wrap: HTMLElement = document.createElement('div');
  wrap.className = 'js-toxin-slider';
  document.body.append(wrap);

  const view = new View(standardOptions, wrap);
  const { element } = view;

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('bar horizontal is initialized and visible visible', () => {
    const bar = element.querySelector('.slider__bar_horizontal');

    expect(bar).toBeVisible();
  });
});
