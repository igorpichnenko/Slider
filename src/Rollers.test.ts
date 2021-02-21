import '@testing-library/jest-dom';

import { View } from './View';
import { Options } from './interfaces';

describe('Rollers', () => {
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
    isDivision: true,
    allColors: {},
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
  
  test('2 rollers must be initialized', () => {
    
    const rollers = view.slider.querySelectorAll('.slider__roller');

    expect(rollers.length).toBe(2);
    expect(rollers[0]).toBeVisible();
    expect(rollers[1]).toBeVisible();
  });
  test('when type = single then only the first video should be visible', () => {
    view.upData({ type: 'single' });
    const rollers = view.slider.querySelectorAll('.slider__roller');

    expect(rollers[0]).toBeVisible();
    expect(rollers[1]).not.toBeVisible();
  });
})