import '@testing-library/jest-dom';
import $ from 'jquery';

import { Presenter } from '../../slider/Presenter/Presenter';
import { Demo } from './Demo';
import { standardOptions } from '../../slider/interfaces/standardOptions';
import { IOptions } from '../../slider/interfaces/interfaces';

describe('Demo', () => {
  let demo: Demo;
  let wrap: JQuery<HTMLElement>;

  beforeEach(() => {
    wrap = $("<div class='js-toxin-slider' ></div>");

    const pages = document.createElement('div');
    pages.className = 'js-demo-pages';

    document.body.append(pages);
    wrap.appendTo('pages');

    const presenter = new Presenter(standardOptions, wrap);
    demo = new Demo(presenter);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('must initialize', () => {
    expect(demo.state).toStrictEqual(standardOptions);
  });
  test('can be created with other parameters', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      isVertical: false,
      isDouble: false,
    };
    const newPresenter: Presenter = new Presenter(newOptions, wrap);
    const newDemo: Demo = new Demo(newPresenter);
    expect(newDemo.state).toStrictEqual(newOptions);
  });
  test('step must not be less than 0.1', () => {
    const stepInput = demo.demoTools.querySelector('.js-step') as HTMLInputElement;

    stepInput.value = '-1';
    stepInput.dispatchEvent(new InputEvent('change'));

    expect(demo.state.step).toBe(0.1);
  });

  test('step must change', () => {
    const stepInput = demo.demoTools.querySelector('.js-step') as HTMLInputElement;
    stepInput.value = '5';
    stepInput.dispatchEvent(new InputEvent('change'));

    expect(demo.state.step).toBe(5);
  });
  test('at max less min, min should remain min', () => {
    const maxInput = demo.demoTools.querySelector('.js-max') as HTMLInputElement;
    maxInput.value = '-200';
    maxInput.dispatchEvent(new InputEvent('change'));

    expect(demo.state.min).toBe(0);
  });

  test('should change the max value to a new one ', () => {
    const maxInput = demo.demoTools.querySelector('.js-max') as HTMLInputElement;
    maxInput.value = '1000';
    maxInput.dispatchEvent(new InputEvent('change'));
    expect(demo.state.max).toBe(1000);
  });

  test('should change the minimum value to a new one', () => {
    const minInput = demo.demoTools.querySelector('.js-min') as HTMLInputElement;
    minInput.value = '-50';
    minInput.dispatchEvent(new InputEvent('change'));

    expect(demo.state.min).toBe(-50);
  });
  test('new max value must be min + step', () => {
    const minInput = demo.demoTools.querySelector('.js-min') as HTMLInputElement;
    minInput.value = '200';
    minInput.dispatchEvent(new InputEvent('change'));

    expect(demo.state.max).toBe(201);
  });
  test('from must change but not be less than min', () => {
    const inputFrom = demo.demoTools.querySelector('.js-from') as HTMLInputElement;
    inputFrom.value = '-6';
    inputFrom.dispatchEvent(new InputEvent('change'));

    expect(demo.state.from).toBe(0);
  });
  test('to should change the value to a new one', () => {
    const inputTo = demo.demoTools.querySelector('.js-to') as HTMLInputElement;
    inputTo.value = '9';
    inputTo.dispatchEvent(new InputEvent('change'));

    expect(demo.state.to).toBe(9);
  });
  test('must change orientation', () => {
    const inputIsOrientation = demo.demoTools.querySelector('.js-orientation')! as HTMLElement;

    inputIsOrientation.dispatchEvent(new InputEvent('change'));

    expect(demo.state.isVertical).toBe(true);
  });

  test('parameter update should work', () => {
    demo.upData({ from: -5 });
    expect(demo.state.from).toBe(-5);

    demo.upData({ to: 8 });
    expect(demo.state.to).toBe(8);

    demo.setState({ from: -4, to: 4 });
    expect(demo.state.to).toBe(4);
    expect(demo.state.from).toBe(0);
  });

  test('should change isLabel parameter', () => {
    const label = demo.demoTools.querySelector('.js-isLabel')! as HTMLInputElement;

    label.checked = true;
    label.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isLabel).toBe(false);

    label.checked = false;
    label.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isLabel).toBe(true);
  });
  test('must change type double/single', () => {
    const isDoubleType = demo.demoTools.querySelector('.js-isDouble')! as HTMLElement;

    isDoubleType.dispatchEvent(new InputEvent('change'));

    expect(demo.state.isDouble).toBe(true);
  });
});
