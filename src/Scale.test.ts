import '@testing-library/jest-dom';

import { View } from './View';
import { Options } from './interfaces';
import { allColors } from './color';

describe('Scale', () => {
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

  test('should be initialized and visible', () => {
    const scale = view.slider.querySelector('.slider__scale');

    expect(scale).toBeVisible();
  });
  test('should be hidden when isScale = false ', () => {
    view.upData({ isScale: true });
    const scale = view.slider.querySelector('.slider__scale');

    expect(scale).toBeVisible();

    view.upData({ isScale: false });
    expect(scale).not.toBeVisible();
  });
  test('clicking on a scale value should trigger a custom scaleclick event', () => {
    const scaleMarker = view.slider.querySelector('.slider__scale-value') as HTMLElement;
    const value = Number(scaleMarker.innerHTML);
    const clickScale = jest.fn((event) => event.detail.value);
    view.slider.addEventListener('scaleclick', clickScale);
    scaleMarker.click();
    expect(clickScale.mock.calls.length).toBe(1);
    expect(clickScale.mock.results[0].value).toBe(value);
  });
  test('clicking on a scale value should trigger a custom scaleclick event, also with type = single', () => {
    view.upData({ type: 'single' });
    const scaleMarker = view.slider.querySelector('.slider__scale-value') as HTMLElement;
    const value = Number(scaleMarker.innerHTML);
    const clickScale = jest.fn((event) => event.detail.value);
    view.slider.addEventListener('scaleclick', clickScale);
    scaleMarker.click();
    expect(clickScale.mock.calls.length).toBe(1);
    expect(clickScale.mock.results[0].value).toBe(value);
  });
  test('', () => {
    const scaleMarker = view.slider.querySelector('.slider__scale') as HTMLElement;
    const clickScale = jest.fn();
    view.slider.addEventListener('scaleclick', clickScale);
    scaleMarker.click();
    expect(clickScale.mock.calls.length).toBe(0);
  });
});
