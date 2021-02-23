import '@testing-library/jest-dom';
import { allColors } from './color';
import { View } from './View';
import { Options } from './interfaces';

describe('View', () => {
  let wrap: HTMLElement;
  let view: View;
  const standardOptions: Options = {
    orientation: 'vertical',
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

  test('initialized and got the correct parameters', () => {
    const {
      orientation, type, minMax, color,
    } = view.state;

    expect(orientation).toBe(standardOptions.orientation);
    expect(type).toBe(standardOptions.type);
    expect(minMax).toBe(standardOptions.minMax);
    expect(color).toBe(standardOptions.color);
  });

  test('sees the necessary methods', () => {
    expect(view.createSlider).toBeDefined();
    expect(view.convertPxToValue).toBeDefined();
  });
  test('make sure it creates the slider with correct parameters', () => {
    const sliderClass = view.slider.className;

    expect(view.slider).toBeTruthy();
    expect(sliderClass).toBe('slider slider_vertical');
  });
  test('should create 2 rollers', () => {
    const rollers = view.slider.querySelectorAll('.slider__roller');

    expect(rollers.length).toBe(2);
    expect(rollers[0]).toBeVisible();
    expect(rollers[1]).toBeVisible();
  });
  test('should create a track', () => {
    const track = view.slider.querySelector('.slider__track_vertical');

    expect(track).toBeTruthy();
    expect(track).toBeVisible();
  });
  test('should create a bar', () => {
    const bar = view.slider.querySelector('.slider__bar_vertical');

    expect(bar).toBeTruthy();
    expect(bar).toBeVisible();
  });
  test('should create a scale', () => {
    const scale = view.slider.querySelector('.slider__scale_vertical');

    expect(scale).toBeTruthy();
    expect(scale).toBeVisible();
  });
  test('upData method should update orientation in state', () => {
    view.upData({ orientation: 'vertical' });
    expect(view.state.orientation).toBe('vertical');

    view.upData({ orientation: 'horizontal' });
    expect(view.state.orientation).toBe('horizontal');

    view.upData({ orientation: 'vertical' });
    expect(view.state.orientation).toBe('vertical');
  });
  test('upData method should update type in state', () => {
    view.upData({ type: 'single' });
    expect(view.state.type).toBe('single');

    view.upData({ type: 'double' });
    expect(view.state.type).toBe('double');

    view.upData({ type: 'single' });
    expect(view.state.type).toBe('single');
  });
  test('upData should change the isScale parameter and change the visibility of the scale', () => {
    const scale = view.slider.querySelector('.slider__scale');

    view.upData({ isScale: false });
    expect(view.state.isScale).toBe(false);
    expect(scale).not.toBeVisible();

    view.upData({ isScale: true });
    expect(view.state.isScale).toBe(true);
    expect(scale).toBeVisible();

    view.upData({ isScale: false });
    expect(view.state.isScale).toBe(false);
    expect(scale).not.toBeVisible();
  });
  test('upData should change the option from', () => {
    view.upData({ from: 0 });
    expect(view.state.from).toBe(0);

    view.upData({ from: -17 });
    expect(view.state.from).toBe(-17);

    view.upData({ from: 7 });
    expect(view.state.from).toBe(7);
  });
  test('upData should change the option to', () => {
    view.upData({ to: 0 });
    expect(view.state.to).toBe(0);

    view.upData({ to: -2 });
    expect(view.state.to).toBe(-2);

    view.upData({ to: 10 });
    expect(view.state.to).toBe(10);
  });
});
