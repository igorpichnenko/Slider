import '@testing-library/jest-dom';
import { allColors } from '../../interfaces/color';
import { View } from '../View';
import { Options } from '../../interfaces/interfaces';

describe('Rollers', () => {
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
    isPrefix: false,
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

  test('2 rollers must be initialized', () => {
    const rollers = view.slider.querySelectorAll('.slider__roller');

    expect(rollers.length).toBe(2);
    expect(rollers[0]).toBeVisible();
    expect(rollers[1]).toBeVisible();
  });

  test('2 tooltip must be initialized', () => {
    const tooltips = view.slider.querySelectorAll('.slider__tooltip');

    expect(tooltips.length).toBe(2);
    expect(tooltips[0]).toBeVisible();
    expect(tooltips[1]).toBeVisible();
  });

  test('if the orientation is "vertical" for tooltips the modifier should be vertical', () => {
    const newOptions = {
      ...standardOptions,
      orientation: 'vertical',
    };

    const newView = new View(newOptions, wrap);

    const tooltips = newView.slider.querySelectorAll('.slider__tooltip_vertical');

    expect(tooltips.length).toBe(2);
    expect(tooltips[0]).toBeVisible();
    expect(tooltips[1]).toBeVisible();
  });

  test('if the orientation is "vertical" for rollers the modifier should be vertical', () => {
    const newOptions = {
      ...standardOptions,
      orientation: 'vertical',
    };

    const newView = new View(newOptions, wrap);

    const rollers = newView.slider.querySelectorAll('.slider__roller_vertical');

    expect(rollers.length).toBe(2);
    expect(rollers[0]).toBeVisible();
    expect(rollers[1]).toBeVisible();
  });

  test('if the checkbox is checked, the islabel is false, then the tooltip should not be visible', () => {
    const tooltips = view.slider.querySelectorAll('.slider__tooltip');

    view.upData({ isLabel: false });

    expect(tooltips[0].classList.contains('slider__tooltip_display-none')).toBe(true);
    expect(tooltips[1].classList.contains('slider__tooltip_display-none')).toBe(true);
  });

  test('when type = single then only the first roller should be visible', () => {
    view.upData({ type: 'single' });
    const rollers = view.slider.querySelectorAll('.slider__roller');

    expect(rollers[0]).toBeVisible();
    expect(rollers[1]).not.toBeVisible();
  });

  test('tooltips should display options to and from', () => {
    const tooltips = view.slider.querySelectorAll('.slider__tooltip');

    expect(tooltips[0].innerHTML).toBe(String(view.state.from));
    expect(tooltips[1].innerHTML).toBe(String(view.state.to));
  });

  test('if the isPrefix = true parameter, the tooltips should display the parameters from and to the + prefix', () => {
    const tooltips = view.slider.querySelectorAll('.slider__tooltip');
    view.upData({ isPrefix: true });

    expect(tooltips[0].innerHTML).toBe(`${view.state.from}${view.state.prefix}`);
    expect(tooltips[1].innerHTML).toBe(`${view.state.to}${view.state.prefix}`);
  });

  test('if isColorOut = true then tooltips display color and gradient', () => {
    const tooltips = view.slider.querySelectorAll('.slider__tooltip');

    view.upData({ isColorOut: true });

    expect(tooltips[0].innerHTML).toBe(view.state.color);
    expect(tooltips[1].innerHTML).toBe(view.state.gradient);
  });

  test('if isColorOut=true then tooltips should be colored with the variable color', () => {
    const firstTooltip = view.slider.querySelector('.slider__tooltip_first') as HTMLElement;
    const secondTooltip = view.slider.querySelector('.slider__tooltip_second') as HTMLElement;

    view.upData({ isColorOut: true });

    expect(firstTooltip.style.backgroundColor).toBe(view.state.color);
    expect(secondTooltip.style.backgroundColor).toBe(view.state.gradient);
  });

  test('if isColorOut = "true" then tolltips should change background', () => {
    const firstTooltip = view.slider.querySelector('.slider__tooltip_first') as HTMLElement;
    const secondTooltip = view.slider.querySelector('.slider__tooltip_second') as HTMLElement;

    view.upData({ isColorOut: true });

    expect(firstTooltip.classList.contains('slider__tooltip_bg')).toBe(true);
    expect(secondTooltip.classList.contains('slider__tooltip_bg')).toBe(true);
  });

  test('when isGradient = false then the background of the rollers is colored with variable color', () => {
    const rollerFirst = view.slider.querySelector('.slider__roller_first') as HTMLElement;
    const rollerSecond = view.slider.querySelector('.slider__roller_second') as HTMLElement;

    view.upData({ isGradient: false });

    expect(rollerFirst.style.background).toBe(view.state.color);
    expect(rollerSecond.style.background).toBe(view.state.color);
  });

  test('when the MouseEvent is fired on the roller, the color update method should be called', () => {
    const spy = jest.spyOn(view, 'convertValueToColor');
    const rollerFirst = view.slider.querySelector('.slider__roller_first') as HTMLElement;

    rollerFirst.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    document.dispatchEvent(new MouseEvent('mousemove'));
    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(spy).toBeCalled();
  });
});
