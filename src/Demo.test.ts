import '@testing-library/jest-dom';

import { Options } from './interfaces';
import { Demo } from './Demo';
import { Presenter } from './Presenter';
import { allColors } from './color';

describe('Demo', () => {
  let demo: Demo;
  let wrap: HTMLElement;
 
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

    const pages = document.createElement('div');
    pages.className = 'js-demo-pages'

    document.body.append(pages);
    pages.append(wrap);

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
    const newOptions: Options = {
      ...standardOptions,
      orientation: 'horizontal',
      type: 'single',
      changeColor: true,
      minMax: false,
    };
    const newPresenter: Presenter = new Presenter(newOptions, wrap);
    const newDemo: Demo = new Demo(newPresenter);
    expect(newDemo.state).toStrictEqual(newOptions);
  });
  test('step must not be less than 1', () => {
    const stepInput = demo.demoTools.querySelector('.js-step') as HTMLInputElement;

    stepInput.value = '-1';
    stepInput.dispatchEvent(new InputEvent('change'));

    expect(demo.state.step).toBe(1);
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
    
    expect(demo.state.orientation).toBe('vertical');
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
 
  test('should change isScalePrefix parameter', () => {
    const inputIsPrefix = demo.demoTools.querySelector('.js-isPrefix')! as HTMLInputElement;

    inputIsPrefix.checked = true;
    inputIsPrefix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isScalePrefix).toBe(false);

    inputIsPrefix.checked = false;
    inputIsPrefix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isScalePrefix).toBe(true);
  });
  
  test('should change isPrefix parameter', () => {
    const inputIsToolPrefix = demo.demoTools.querySelector('.js-isPrefixTool')! as HTMLInputElement;

    inputIsToolPrefix.checked = true;
    inputIsToolPrefix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isPrefix).toBe(false);

    inputIsToolPrefix.checked = false;
    inputIsToolPrefix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isPrefix).toBe(true);
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
    const isDouble = demo.demoTools.querySelector('.js-isDouble')! as HTMLElement;
    
    isDouble.dispatchEvent(new InputEvent('change'));
    
    expect(demo.state.type).toBe('single');
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
  test('should change isTrackPrefix parameter', () => {
    const inputIsTrackPrefix = demo.demoTools.querySelector('.js-isTrackPrefix')! as HTMLInputElement;

    inputIsTrackPrefix.checked = true;
    inputIsTrackPrefix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isTrackPrefix).toBe(false);

    inputIsTrackPrefix.checked = false;
    inputIsTrackPrefix.dispatchEvent(new InputEvent('change'));
    expect(demo.state.isTrackPrefix).toBe(true);
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
  test('the prefix should change', () => {
    const inputMarker = demo.demoTools.querySelector('.js-marker') as HTMLInputElement;

    inputMarker.value = '$';
    inputMarker.dispatchEvent(new InputEvent('change'));

    expect(demo.state.prefix).toBe('$');
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
  test('the prefix scale should change', () => {
    const inputScalePrefix = demo.demoTools.querySelector('.js-scale-prefix') as HTMLInputElement;

    inputScalePrefix.value = '#';
    inputScalePrefix.dispatchEvent(new InputEvent('change'));

    expect(demo.state.scalePrefix).toBe('#');
  });
  test('the prefix track should change', () => {
    const inputTrackPrefix = demo.demoTools.querySelector('.js-track-prefix') as HTMLInputElement;

    inputTrackPrefix.value = '¢';
    inputTrackPrefix.dispatchEvent(new InputEvent('change'));

    expect(demo.state.trackPrefix).toBe('¢');
  });
  
  
});
