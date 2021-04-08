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
      changeColor: true,
      minMax: false,
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

  test('should change isScale parameter', () => {
    const changeScale = demo.demoTools.querySelector('.js-isScale')! as HTMLInputElement;

    changeScale.checked = true;
    changeScale.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isScale).toBe(false);

    changeScale.checked = false;
    changeScale.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isScale).toBe(true);
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

  test('should change isScalePostfix parameter', () => {
    const inputIsPostfix = demo.demoTools.querySelector('.js-isPostfix')! as HTMLInputElement;

    inputIsPostfix.checked = true;
    inputIsPostfix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isScalePostfix).toBe(false);

    inputIsPostfix.checked = false;
    inputIsPostfix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isScalePostfix).toBe(true);
  });

  test('should change isPostfix parameter', () => {
    const inputIsToolProstfix = demo.demoTools.querySelector('.js-isPostfixTool')! as HTMLInputElement;

    inputIsToolProstfix.checked = true;
    inputIsToolProstfix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isPostfix).toBe(false);

    inputIsToolProstfix.checked = false;
    inputIsToolProstfix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isPostfix).toBe(true);
  });
  test('should change isGradient parameter', () => {
    const inputGradient = demo.demoTools.querySelector('.js-gradient')! as HTMLInputElement;

    inputGradient.checked = true;
    inputGradient.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isGradient).toBe(false);

    inputGradient.checked = false;
    inputGradient.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isGradient).toBe(true);
  });
  test('should change isColorOut parameter', () => {
    const inputColorOut = demo.demoTools.querySelector('.js-isColorOut')! as HTMLInputElement;

    inputColorOut.checked = true;
    inputColorOut.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isColorOut).toBe(true);

    inputColorOut.checked = false;
    inputColorOut.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isColorOut).toBe(false);
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
  test('should change minMax parameter', () => {
    const inputMinMax = demo.demoTools.querySelector('.js-minMax')! as HTMLInputElement;

    inputMinMax.checked = true;
    inputMinMax.dispatchEvent(new InputEvent('change'));
    expect(demo.state.minMax).toBe(true);

    inputMinMax.checked = false;
    inputMinMax.dispatchEvent(new InputEvent('change'));
    expect(demo.state.minMax).toBe(false);
  });
  test('should change fromTo parameter', () => {
    const inputFromTo = demo.demoTools.querySelector('.js-fromTo')! as HTMLInputElement;

    inputFromTo.checked = true;
    inputFromTo.dispatchEvent(new InputEvent('change'));
    expect(demo.state.fromTo).toBe(true);

    inputFromTo.checked = false;
    inputFromTo.dispatchEvent(new InputEvent('change'));
    expect(demo.state.fromTo).toBe(false);
  });
  test('should change onlyDivisions parameter', () => {
    const inputDivision = demo.demoTools.querySelector('.js-division')! as HTMLInputElement;

    inputDivision.checked = true;
    inputDivision.dispatchEvent(new InputEvent('change'));
    expect(demo.state.onlyDivisions).toBe(true);

    inputDivision.checked = false;
    inputDivision.dispatchEvent(new InputEvent('change'));
    expect(demo.state.onlyDivisions).toBe(false);
  });
  test('should change isTrackPostfix parameter', () => {
    const inputIsTrackPostfix = demo.demoTools.querySelector('.js-isTrackPostfix')! as HTMLInputElement;

    inputIsTrackPostfix.checked = true;
    inputIsTrackPostfix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isTrackPostfix).toBe(false);

    inputIsTrackPostfix.checked = false;
    inputIsTrackPostfix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isTrackPostfix).toBe(true);
  });
  test('should change isColor parameter', () => {
    const inputIsColor = demo.demoTools.querySelector('.js-isColor')! as HTMLInputElement;

    inputIsColor.checked = true;
    inputIsColor.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isColor).toBe(false);

    inputIsColor.checked = false;
    inputIsColor.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isColor).toBe(true);
  });
  test('should change changeColor parameter', () => {
    const inputChangeColor = demo.demoTools.querySelector('.js-changeColor')! as HTMLInputElement;

    inputChangeColor.checked = true;
    inputChangeColor.dispatchEvent(new InputEvent('change'));
    expect(demo.state.changeColor).toBe(false);

    inputChangeColor.checked = false;
    inputChangeColor.dispatchEvent(new InputEvent('change'));
    expect(demo.state.changeColor).toBe(true);
  });
  test('the postfix should change', () => {
    const inputMarker = demo.demoTools.querySelector('.js-marker') as HTMLInputElement;

    inputMarker.value = '$';
    inputMarker.dispatchEvent(new InputEvent('change'));

    expect(demo.state.postfix).toBe('$');
  });
  test('the color should change', () => {
    const inputColor = demo.demoTools.querySelector('.js-color') as HTMLInputElement;

    inputColor.value = 'green';
    inputColor.dispatchEvent(new InputEvent('change'));

    expect(demo.state.color).toBe('green');
  });

  test('the gradient should change', () => {
    const inputGradientOut = demo.demoTools.querySelector('.js-gradient-out') as HTMLInputElement;

    inputGradientOut.value = 'blue';
    inputGradientOut.dispatchEvent(new InputEvent('change'));

    expect(demo.state.gradient).toBe('blue');
  });
  test('the gradientDeg should change', () => {
    const inputGradientDeg = demo.demoTools.querySelector('.js-gradient-deg') as HTMLInputElement;

    inputGradientDeg.value = '90';
    inputGradientDeg.dispatchEvent(new InputEvent('change'));

    expect(demo.state.gradientDeg).toBe(90);
  });
  test('the postfix scale should change', () => {
    const inputScalePostfix = demo.demoTools.querySelector('.js-scale-postfix') as HTMLInputElement;

    inputScalePostfix.value = '#';
    inputScalePostfix.dispatchEvent(new InputEvent('change'));

    expect(demo.state.scalePostfix).toBe('#');
  });
  test('the postfix track should change', () => {
    const inputTrackPostfix = demo.demoTools.querySelector('.js-track-postfix') as HTMLInputElement;

    inputTrackPostfix.value = '¢';
    inputTrackPostfix.dispatchEvent(new InputEvent('change'));

    expect(demo.state.trackPostfix).toBe('¢');
  });

  test('gets new settings separate', () => {
    demo.upData({ separate: '.' });
    expect(demo.state.separate).toBe('.');

    demo.upData({ separate: ',' });
    expect(demo.state.separate).toBe(',');

    demo.setState({ separate: ' ' });
    expect(demo.state.separate).toBe(' ');
  });

  test('if in the input we enter separate = "." then you should get it in state', () => {
    const inputSeparate = demo.demoTools.querySelector('.js-separate') as HTMLInputElement;

    inputSeparate.value = ',';
    inputSeparate.dispatchEvent(new InputEvent('change'));

    expect(demo.state.separate).toBe(',');
  });

  test('if in the input we enter separate = "." then you should get it in state', () => {
    const inputSeparate = demo.demoTools.querySelector('.js-separate') as HTMLInputElement;

    inputSeparate.value = '';
    inputSeparate.dispatchEvent(new InputEvent('change'));

    expect(demo.state.separate).toBe(' ');
  });

  test('if we enter separate = undefined in the input, then we should get a default value in state', () => {
    const inputSeparate = demo.demoTools.querySelector('.js-separate') as HTMLInputElement;

    inputSeparate.value = 'undefined';
    inputSeparate.dispatchEvent(new InputEvent('change'));

    expect(demo.state.separate).toBe(' ');
  });

  test('should change isPrefix parameter', () => {
    const inputIsPrefix = demo.demoTools.querySelector('.js-isPrefix-all')! as HTMLInputElement;

    inputIsPrefix.checked = true;
    inputIsPrefix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isPrefix).toBe(true);

    inputIsPrefix.checked = false;
    inputIsPrefix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isPrefix).toBe(false);
  });

  test('the menuColor should be shown on click', () => {
    const btnColor = demo.demoTools.querySelector('.js-btn-color')! as HTMLButtonElement;
    const menuColor = demo.demoTools.querySelector('.js-color-setting')! as HTMLElement;

    expect(menuColor.classList.contains('panel__close')).toBe(false);

    btnColor.click();

    expect(menuColor.classList.contains('panel__close')).toBe(true);
  });

  test('the menuView should be shown on click', () => {
    const btnView = demo.demoTools.querySelector('.js-btn-view')! as HTMLButtonElement;
    const menuView = demo.demoTools.querySelector('.js-menu-view')! as HTMLElement;

    expect(menuView.classList.contains('panel__close')).toBe(false);

    btnView.click();

    expect(menuView.classList.contains('panel__close')).toBe(true);
  });
  test('the menuPostfix should be shown on click', () => {
    const btnPostfix = demo.demoTools.querySelector('.js-btn-postfix')! as HTMLButtonElement;
    const menuPostfix = demo.demoTools.querySelector('.js-menu-postfix')! as HTMLElement;

    expect(menuPostfix.classList.contains('panel__close')).toBe(false);

    btnPostfix.click();

    expect(menuPostfix.classList.contains('panel__close')).toBe(true);
  });
  test('the menuScale should be shown on click', () => {
    const btnScale = demo.demoTools.querySelector('.js-btn-scale')! as HTMLButtonElement;
    const menuScale = demo.demoTools.querySelector('.js-menu-scale')! as HTMLElement;

    expect(menuScale.classList.contains('panel__close')).toBe(false);

    btnScale.click();

    expect(menuScale.classList.contains('panel__close')).toBe(true);
  });
});
