import '@testing-library/jest-dom';
import { allColors } from '../../interfaces/color';
import { View } from '../View';
import { Options } from '../../interfaces/interfaces';

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
    const scale = view.slider.querySelector('.slider__scale_horizontal');

    expect(scale).toBeVisible();
  });

  test('if orientation = "vertical" then the scale should have the modifier "vertical"', () => {
    const newOptions = {
      ...standardOptions,
      orientation: 'vertical',
    };

    const newView = new View(newOptions, wrap);

    const scale = newView.slider.querySelector('.slider__scale_vertical');

    expect(scale).toBeVisible();
  });

  test('should be hidden when isScale = false ', () => {
    view.upData({ isScale: true });
    const scale = view.slider.querySelector('.slider__scale');

    expect(scale).toBeVisible();

    view.upData({ isScale: false });
    expect(scale).not.toBeVisible();
  });

  test('scale divisions should be hidden', () => {
    view.upData({ isScale: true });
    const scaleMarker = view.slider.querySelector('.slider__scale-value');

    expect(scaleMarker).toBeVisible();

    view.upData({ isScale: false });
    expect(scaleMarker).not.toBeVisible();
  });

  test('scale divisions must be created', () => {
    const scaleMarker = view.slider.querySelector('.slider__scale-value');

    expect(scaleMarker).toBeVisible();
  });

  test('if orientation = "vertical" scale divisions should be created with the "vertical" modifier', () => {
    const newOptions = {
      ...standardOptions,
      orientation: 'vertical',
    };

    const newView = new View(newOptions, wrap);

    const scaleMarker = newView.slider.querySelector('.slider__scale-value_vertical');

    expect(scaleMarker).toBeVisible();
  });

  test('if the scale element is one, then by condition it is equal to max', () => {
    const scaleMarker = view.slider.querySelector('.slider__scale-value')! as HTMLElement;

    expect(scaleMarker.innerHTML).toBe(String(view.state.max));
  });

  test('if onlyDivisions = true then the scale division must have the fs-0 modifier', () => {
    view.upData({ onlyDivisions: true });

    const scaleMarker = view.slider.querySelector('.slider__scale-value') as HTMLElement;

    expect(scaleMarker.classList.contains('slider__scale-value_fs-0')).toBe(true);
  });

  test('division must have a prefix', () => {
    const scaleMarker = view.slider.querySelector('.slider__scale-value') as HTMLElement;

    expect(scaleMarker.getAttribute('data-text')).toBe(view.state.scalePrefix);
  });

  test('divisions must not have a prefix', () => {
    view.upData({ isScalePrefix: false });

    const scaleMarker = view.slider.querySelector('.slider__scale-value') as HTMLElement;

    expect(scaleMarker.getAttribute('data-text')).not.toBe(view.state.scalePrefix);
  });

  test('clicking on the scale should return the scale value', () => {
    const scaleMarker = view.slider.querySelector('.slider__scale-value') as HTMLElement;
    const value = Number(scaleMarker.innerHTML);

    const clickScale = jest.fn((event) => event.detail.value);

    view.slider.addEventListener('scaleclick', clickScale);

    scaleMarker.click();

    expect(clickScale.mock.calls.length).toBe(1);
    expect(clickScale.mock.results[0].value).toBe(value);
  });
});
