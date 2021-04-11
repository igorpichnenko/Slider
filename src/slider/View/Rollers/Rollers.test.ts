import '@testing-library/jest-dom';
import $ from 'jquery';

import { View } from '../View';
import { standardOptions } from '../../interfaces/standardOptions';
import { classNames } from '../../libs/classNames';

describe('Rollers', () => {
  let wrap: JQuery<HTMLElement>;
  let view: View;

  beforeEach(() => {
    wrap = $("<div class='js-toxin-slider' ></div>");
    wrap.appendTo('body');
    view = new View(standardOptions, wrap);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('2 rollers must be initialized', () => {
    const rollers = view.slider.querySelectorAll(classNames.findRollers);
    const [rollerFirst, rollerSecond] = [rollers[0], rollers[1]];

    expect(rollers.length).toBe(2);
    expect(rollerFirst).toBeVisible();
    expect(rollerSecond).toBeVisible();
  });

  test('2 tooltip must be initialized', () => {
    const tooltips = view.slider.querySelectorAll(classNames.findTooltip);

    expect(tooltips.length).toBe(2);
    expect(tooltips[0]).toBeVisible();
    expect(tooltips[1]).toBeVisible();
  });

  test('tooltips should display options to and from', () => {
    view.upData({ isPostfix: false });

    const tooltips = view.slider.querySelectorAll(classNames.findTooltip);

    expect(tooltips[0].innerHTML).toBe(String(view.state.from));
    expect(tooltips[1].innerHTML).toBe(String(view.state.to));
  });

  test('if the isPostfix = true parameter, the tooltips should display the parameters from and to the + postfix', () => {
    const tooltips = view.slider.querySelectorAll(classNames.findTooltip);
    view.upData({ isPostfix: true });

    expect(tooltips[0].innerHTML).toBe(`${view.state.from}${view.state.postfix}`);
    expect(tooltips[1].innerHTML).toBe(`${view.state.to}${view.state.postfix}`);
  });

  test('if the isPrefix = true parameter, the tooltips should display the parameters from and to the + prefix', () => {
    const tooltips = view.slider.querySelectorAll(classNames.findTooltip);
    view.upData({ isPrefix: true });

    expect(tooltips[0].innerHTML).toBe(`${view.state.postfix}${view.state.from}`);
    expect(tooltips[1].innerHTML).toBe(`${view.state.postfix}${view.state.to}`);
  });

  test('if isColorOut = true, then the default color and gradient name is displayed in tooltips', () => {
    const tooltips = view.slider.querySelectorAll(classNames.findTooltip);

    view.upData({ isColorOut: true });

    expect(tooltips[0].innerHTML).toBe('Оранжевый');
    expect(tooltips[1].innerHTML).toBe('Фиолетовый');
  });

  test('if isColorOut=true then tooltips should be colored with the variable color', () => {
    const firstTooltip = view.slider.querySelector(classNames.findFirstTooltip) as HTMLElement;
    const secondTooltip = view.slider.querySelector(classNames.findSecondTooltip) as HTMLElement;

    view.upData({ isColorOut: true });

    expect(firstTooltip.style.backgroundColor).toBe(view.state.color);
    expect(secondTooltip.style.backgroundColor).toBe(view.state.gradient);
  });

  test('when the MouseEvent is fired on the roller, the color update method should be called', () => {
    const spy = jest.spyOn(view, 'convertValueToColor');
    const rollerFirst = view.slider.querySelector(classNames.findRollers) as HTMLElement;

    rollerFirst.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    document.dispatchEvent(new MouseEvent('mousemove'));
    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(spy).toBeCalled();
  });

  test('if isColorOut = "true" then tolltips should change background', () => {
    const firstTooltip = view.slider.querySelector(classNames.findFirstTooltip) as HTMLElement;
    const secondTooltip = view.slider.querySelector(classNames.findSecondTooltip) as HTMLElement;

    view.upData({ isColorOut: true });

    expect(firstTooltip.classList.contains(classNames.tooltipWhite)).toBe(true);
    expect(secondTooltip.classList.contains(classNames.tooltipWhite)).toBe(true);
  });

  test('when isGradient = false then the background of the rollers is colored with variable color', () => {
    const roller = view.slider.querySelector(classNames.findRollers) as HTMLElement;

    view.upData({ isGradient: false });

    expect(roller.style.background).toBe(view.state.color);
  });

  test('if separate = ",", then the result should be equal to "en-US" of the locale', () => {
    const tooltips = view.slider.querySelectorAll(classNames.findTooltip);

    view.upData({
      separate: ',',
      max: 10000,
      from: 1000,
      to: 5000,
    });

    expect(tooltips[0].innerHTML).toBe(`${view.state.from.toLocaleString('en-US')}${view.state.postfix}`);
    expect(tooltips[1].innerHTML).toBe(`${view.state.to.toLocaleString('en-US')}${view.state.postfix}`);
  });
  test('if separate = ".", then the result should be equal to "de-DE" of the locale', () => {
    const tooltips = view.slider.querySelectorAll(classNames.findTooltip);

    view.upData({
      separate: '.',
      max: 10000,
      from: 1000,
      to: 5000,
    });

    expect(tooltips[0].innerHTML).toBe(`${view.state.from.toLocaleString('de-DE')}${view.state.postfix}`);
    expect(tooltips[1].innerHTML).toBe(`${view.state.to.toLocaleString('de-DE')}${view.state.postfix}`);
  });

  test('isSeparate = false then there should be no separator', () => {
    const tooltips = view.slider.querySelectorAll(classNames.findTooltip);

    view.upData({
      max: 10000,
      from: 1000,
      to: 5000,
      isSeparate: false,
    });

    expect(tooltips[0].innerHTML).toBe(`${view.state.from.toString()}${view.state.trackPostfix}`);
    expect(tooltips[1].innerHTML).toBe(`${view.state.to.toString()}${view.state.trackPostfix}`);
  });
});
