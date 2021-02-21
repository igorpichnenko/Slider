import '@testing-library/jest-dom';

import { Options } from './interfaces';
import { Demo } from './Demo';
import { Presenter } from './Presenter';

describe('Demo', () => {
  let wrap: HTMLElement;
  let demo: Demo;
  let presenter: Presenter;
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

    presenter = new Presenter(standardOptions, wrap);
    demo = new Demo(presenter);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('must initialize', () => {
    expect(demo.state).toStrictEqual(standardOptions);
  });
  test('can be created with other parameters', () => {
    const newOptions: Options = {
      ...standardOptions,
      orientation: 'horizontal',
      type: 'single',
      isLabel: true,
      isScale: true,
    };
    const newPresenter: Presenter = new Presenter(newOptions, wrap);
    const newDemo: Demo = new Demo(newPresenter);
    expect(newDemo.state).toStrictEqual(newOptions);
  });
  test('', () => {
    const minInput = demo.demoTools.querySelector('.js-min') as HTMLInputElement;
    minInput.value = '-50';
    minInput.dispatchEvent(new InputEvent('change'));

    expect(demo.state.min).toBe(-50);
  });
  test('', () => {
    const minInput = demo.demoTools.querySelector('.js-min') as HTMLInputElement;
    minInput.value = '200';
    minInput.dispatchEvent(new InputEvent('change'));

    expect(demo.state.max).toBe(201);
  });
});
