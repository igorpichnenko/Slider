import '@testing-library/jest-dom';
import $ from 'jquery';

import { View } from '../View';
import { Bar } from './Bar';
import { standardOptions } from '../../interfaces/standardOptions';
import { IViewState, IOptions } from '../../interfaces/interfaces';

describe('Bar', () => {
  let wrap: JQuery<HTMLElement>;
  let view: View;

  beforeEach(() => {
    wrap = $("<div class='js-toxin-slider' ></div>");
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

  test('bar horizontal is initialized and visible visible', () => {
    const bar = view.slider.querySelector('.js-slider__bar');

    expect(bar).toBeVisible();
  });

  test('if isGradient = false then the background of the bar must be the color of the variable', () => {
    const bar = view.slider.querySelector('.js-slider__bar') as HTMLElement;

    view.upData({ isGradient: false });

    expect(bar.style.background).toBe(view.state.color);
  });

  test('clicking on the bar should update the coordinates', () => {
    const spy = jest.spyOn(view, 'convertPxToValue');
    const bar = view.slider.querySelector('.js-slider__bar') as HTMLElement;
    bar.click();

    expect(spy).toBeCalled();
  });

  test('if the orientation is "vertical" bar should have a vertical modifier', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      orientation: 'vertical',
    };

    const newView = new View(newOptions, wrap);

    const bar = newView.slider.querySelector('.js-slider__bar_vertical');

    expect(bar).toBeVisible();
  });

  test('must find the position correctly', () => {
    const state: IViewState = {
      size: 266,
      oneStep: 26.6,
      slider: view.slider,
      ...standardOptions,
    };
    const bar = new Bar(state);

    expect(bar.getNewSliderPos(state)).toBe(70);
  });
});
