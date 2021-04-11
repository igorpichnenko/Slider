import '@testing-library/jest-dom';
import $ from 'jquery';

import { View } from './View';
import { standardOptions } from '../interfaces/standardOptions';
import { IOptions, IViewState } from '../interfaces/interfaces';
import { classNames } from '../libs/classNames';


describe('View', () => {
  let wrap: JQuery<HTMLElement>;
  let view: View;

  beforeEach(() => {
    wrap = $("<div class='js-toxin-slider'  ></div>");
    wrap.appendTo('body');

    view = new View(standardOptions, wrap);
    const { slider } = view;

    slider.getBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 0,
      width: 266,
      height: 300,
      bottom: 0,
      left: 70,
      right: 0,
      top: 80,
      toJSON: jest.fn(),
    }));
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('initialized and got the correct parameters', () => {
    const {
      isVertical, minMax, color, isDouble,
    } = view.state;

    expect(isVertical).toBe(standardOptions.isVertical);
    expect(isDouble).toBe(standardOptions.isDouble);
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
    expect(sliderClass).toBe(classNames.slider);
  });

  test('should create 2 rollers', () => {
    const rollers = view.slider.querySelectorAll(classNames.findRollers);

    expect(rollers.length).toBe(2);
    expect(rollers[0]).toBeVisible();
    expect(rollers[1]).toBeVisible();
  });

  test('should create 2 tooltips', () => {
    const tooltips = view.slider.querySelectorAll(classNames.findTooltip);

    expect(tooltips.length).toBe(2);
    expect(tooltips[0]).toBeVisible();
    expect(tooltips[1]).toBeVisible();
  });

  test('should create 2 outElements', () => {
    const outElements = view.slider.querySelectorAll(classNames.findTrackOut);

    expect(outElements.length).toBe(2);
    expect(outElements[0]).toBeVisible();
    expect(outElements[1]).toBeVisible();
  });

  test('should create a track', () => {
    const track = view.slider.querySelector(classNames.findTrack);

    expect(track).toBeTruthy();
    expect(track).toBeVisible();
  });

  test('should create a bar', () => {
    const bar = view.slider.querySelector(classNames.findBar);

    expect(bar).toBeTruthy();
    expect(bar).toBeVisible();
  });

  test('should create a scale', () => {
    const scale = view.slider.querySelector(classNames.findScale);

    expect(scale).toBeTruthy();
    expect(scale).toBeVisible();
  });

  test('upData method should update orientation in state', () => {
    view.upData({ isVertical: true });
    expect(view.state.isVertical).toBe(true);

    view.upData({ isVertical: false });
    expect(view.state.isVertical).toBe(false);

    view.upData({ isVertical: true });
    expect(view.state.isVertical).toBe(true);
  });
  test('roller move must call updatePosition method', () => {
    const spy = jest.spyOn(view, 'updatePosition');
    const roller = view.slider.querySelector(classNames.findRollers) as HTMLElement;
    roller.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    document.dispatchEvent(new MouseEvent('mousemove'));
    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(spy).toBeCalled();
  });

  test('upData method should update type in state', () => {
    view.upData({ isDouble: false });
    expect(view.state.isDouble).toBe(false);

    view.upData({ isDouble: true });
    expect(view.state.isDouble).toBe(true);

    view.upData({ isDouble: false });
    expect(view.state.isDouble).toBe(false);
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

  test('upData should change the option color', () => {
    view.upData({ color: 'green' });
    expect(view.state.color).toBe('green');

    view.upData({ color: 'red' });
    expect(view.state.color).toBe('red');

    view.upData({ color: 'blue' });
    expect(view.state.color).toBe('blue');
  });

  test('upData should change the option gradient', () => {
    view.upData({ gradient: 'green' });
    expect(view.state.gradient).toBe('green');

    view.upData({ gradient: 'red' });
    expect(view.state.gradient).toBe('red');

    view.upData({ gradient: 'blue' });
    expect(view.state.gradient).toBe('blue');
  });
  test('upData should change the option gradientDeg', () => {
    view.upData({ gradientDeg: 37 });
    expect(view.state.gradientDeg).toBe(37);

    view.upData({ gradientDeg: 48 });
    expect(view.state.gradientDeg).toBe(48);

    view.upData({ gradientDeg: 76 });
    expect(view.state.gradientDeg).toBe(76);
  });

  test('upData should change the option prefix', () => {
    view.upData({ postfix: '$' });
    expect(view.state.postfix).toBe('$');

    view.upData({ postfix: '€' });
    expect(view.state.postfix).toBe('€');

    view.upData({ postfix: '$' });
    expect(view.state.postfix).toBe('$');
  });

  test('upData should change the option trackPrefix', () => {
    view.upData({ trackPostfix: '$' });
    expect(view.state.trackPostfix).toBe('$');

    view.upData({ trackPostfix: '€' });
    expect(view.state.trackPostfix).toBe('€');

    view.upData({ trackPostfix: '$' });
    expect(view.state.trackPostfix).toBe('$');
  });

  test('upData should change the option scalePrefix', () => {
    view.upData({ scalePostfix: '$' });
    expect(view.state.scalePostfix).toBe('$');

    view.upData({ scalePostfix: '€' });
    expect(view.state.scalePostfix).toBe('€');

    view.upData({ scalePostfix: '$' });
    expect(view.state.scalePostfix).toBe('$');
  });

  test('the method must calculate the size', () => {
    expect(view.getSliderSize(standardOptions)).toBe(266);
  });

  test('the method must calculate the oneStep', () => {
    const { slider } = view;
    const result = 260 / ((10 - 0) / 1);

    slider.getBoundingClientRect = jest.fn(() => ({
      x: 0,
      y: 0,
      width: 260,
      height: 300,
      bottom: 0,
      left: 70,
      right: 0,
      top: 80,
      toJSON: jest.fn(),
    }));

    expect(view.getOneStep(standardOptions)).toBe(result);
  });

  test('the method should return the vertical size', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      isVertical: true,
    };

    expect(view.getSliderSize(newOptions)).toBe(300);
  });

  test('should return the vertical position', () => {
    view.upData({ isVertical: true });

    expect(view.getSliderPosition()).toBe(80);
  });

  test('the method must correctly calculate the coordinates', () => {
    const state: Partial<IViewState> = {
      min: 0, max: 100, step: 5, oneStep: 26.6, size: 266, isVertical: false,
    };

    const result = Math.round((200 - 70) / 26.6) * 5 + 0;

    view.upData(state);

    expect(view.convertPxToValue(200)).toBe(result);
  });
});
