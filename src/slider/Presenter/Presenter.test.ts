import '@testing-library/jest-dom';
import $ from 'jquery';

import { Presenter } from './Presenter';
import { standardOptions } from '../interfaces/standardOptions';

describe('Presenter', () => {
  let wrap: JQuery<HTMLElement>;
  let presenter: Presenter;

  beforeEach(() => {
    wrap = $("<div class='js-toxin-slider' ></div>");
    wrap.appendTo('body');
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
  test('should get a new one postfix the model', () => {
    const postfix = '₽';
    presenter.setOptions({ postfix });
    expect(presenter.getOptions().postfix).toBe(postfix);
  });
  test('should get a new one isScalePrefix the model', () => {
    const isScalePostfix = true;
    presenter.setOptions({ isScalePostfix });
    expect(presenter.getOptions().isScalePostfix).toBe(isScalePostfix);
  });
  test('should get a new one scalePrefix the model', () => {
    const scalePostfix = '₽';
    presenter.setOptions({ scalePostfix });
    expect(presenter.getOptions().scalePostfix).toBe(scalePostfix);
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
