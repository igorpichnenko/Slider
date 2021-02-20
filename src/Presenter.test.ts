import '@testing-library/jest-dom';

import { Options } from './interfaces';
import { Presenter } from './Presenter';

describe('Presenter', () => {
  let wrap: HTMLElement;
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
  };

  beforeEach(() => {
    wrap = document.createElement('div');
    wrap.className = 'js-toxin-slider';
    document.body.append(wrap);
    presenter = new Presenter(standardOptions, wrap);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should create a model', () => {
    presenter.createModel(standardOptions);
    expect(presenter.model.setData).toBeDefined();
  });

  test('should create a view', () => {
    presenter.createView(standardOptions, wrap);
    expect(presenter.view.upData).toBeDefined();
  });

  test('should get settings from model', () => {
    expect(presenter.getOptions()).toStrictEqual(standardOptions);
  });

  test('must get correct parameters', () => {
    const max = -8;
    presenter.setOptions({ max });
    expect(presenter.getOptions().max).not.toBe(max);
  });

  test('should get a new one from the model', () => {
    const from = 3;
    presenter.setOptions({ from });
    expect(presenter.getOptions().from).toBe(from);
  });

  test('should get a new one step the model', () => {
    const step = 2;
    presenter.setOptions({ step });
    expect(presenter.getOptions().step).toBe(step);
  });
  test('should get a new one orientation the model', () => {
    const orientation = 'vertical';
    presenter.setOptions({ orientation });
    expect(presenter.getOptions().orientation).toBe(orientation);
  });

  test('should get a new one type the model', () => {
    const type = 'single';
    presenter.setOptions({ type });
    expect(presenter.getOptions().type).toBe(type);
  });
  test('should get a new one color the model', () => {
    const color = 'purple';
    presenter.setOptions({ color });
    expect(presenter.getOptions().color).toBe(color);
  });
  test('should get a new one prefix the model', () => {
    const prefix = '₽';
    presenter.setOptions({ prefix });
    expect(presenter.getOptions().prefix).toBe(prefix);
  });
  test('should get a new one isScalePrefix the model', () => {
    const isScalePrefix = true;
    presenter.setOptions({ isScalePrefix });
    expect(presenter.getOptions().isScalePrefix).toBe(isScalePrefix);
  });
  test('should get a new one scalePrefix the model', () => {
    const scalePrefix = '₽';
    presenter.setOptions({ scalePrefix });
    expect(presenter.getOptions().scalePrefix).toBe(scalePrefix);
  });
  test('should get a new one isLabel the model', () => {
    const isLabel = true;
    presenter.setOptions({ isLabel });
    expect(presenter.getOptions().isLabel).toBe(isLabel);
  });
  test('should get a new one isScale the model', () => {
    const isScale = true;
    presenter.setOptions({ isScale });
    expect(presenter.getOptions().isScale).toBe(isScale);
  });
});
