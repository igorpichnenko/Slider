import '@testing-library/jest-dom';
import $ from 'jquery';

import { View } from '../View';
import { standardOptions } from '../../interfaces/standardOptions';

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

  test('track horizontal is initialized and visible', () => {
    const track = view.slider.querySelector('.slider__track_horizontal');
    expect(track).toBeVisible();
    expect(view.convertPxToValue).toBeDefined();
  });

  test('if orientation = "vertical" then track must have a vertical modifier', () => {
    const newOptions = {
      ...standardOptions,
      orientation: 'vertical',
    };

    const newView = new View(newOptions, wrap);

    const track = newView.slider.querySelector('.slider__track_vertical');
    expect(track).toBeVisible();
  });

  test('2 out element should be created', () => {
    const out = view.slider.querySelectorAll('.slider__out');

    expect(out.length).toBe(2);
    expect(out[0]).toBeVisible();
    expect(out[1]).toBeVisible();
  });

  test('if orientation = "vertical" then out element must have a vertical modifier', () => {
    const newOptions = {
      ...standardOptions,
      orientation: 'vertical',
    };

    const newView = new View(newOptions, wrap);

    const outStart = newView.slider.querySelector('.slider__out-start_vertical') as HTMLElement;

    const outEnd = newView.slider.querySelector('.slider__out-end_vertical') as HTMLElement;

    expect(outStart).toBeVisible();
    expect(outEnd).toBeVisible();
  });

  test('if minMax = true, then the out element should display the min, max and trackPrefix values', () => {
    const out = view.slider.querySelectorAll('.slider__out');

    view.upData({ minMax: true });

    expect(out[0].innerHTML).toBe(`${view.state.min.toLocaleString()}${view.state.trackPostfix}`);
    expect(out[1].innerHTML).toBe(`${view.state.max.toLocaleString()}${view.state.trackPostfix}`);
  });

  test('clicking on the track should update the coordinates', () => {
    const spy = jest.spyOn(view, 'convertPxToValue');
    const track = view.slider.querySelector('.slider__track') as HTMLElement;
    track.click();

    expect(spy).toBeCalled();
  });

  test('if fromTo = true, then the out element should display the from, to and trackPrefix values', () => {
    const out = view.slider.querySelectorAll('.slider__out');

    view.upData({ fromTo: true });

    expect(out[0].innerHTML).toBe(`${view.state.from.toLocaleString()}${view.state.trackPostfix}`);
    expect(out[1].innerHTML).toBe(`${view.state.to.toLocaleString()}${view.state.trackPostfix}`);
  });

  test('if isPrefix = true then they should be prefix and not postfix', () => {
    const out = view.slider.querySelectorAll('.slider__out');

    view.upData({ isPrefix: true, fromTo: true });

    expect(out[0].innerHTML).toBe(`${view.state.trackPostfix}${view.state.from.toLocaleString()}`);
    expect(out[1].innerHTML).toBe(`${view.state.trackPostfix}${view.state.to.toLocaleString()}`);
  });

  test('if fromTo=true, isTrackPrefix=false, then the out element should display from, to values', () => {
    const out = view.slider.querySelectorAll('.slider__out');

    view.upData({
      fromTo: true,
      isTrackPostfix: false,
    });

    expect(out[0].innerHTML).toBe(`${view.state.from.toLocaleString()}`);
    expect(out[1].innerHTML).toBe(`${view.state.to.toLocaleString()}`);
  });
  test('if minMax=true, isTrackPrefix=false, then the out element should display min, max values', () => {
    const out = view.slider.querySelectorAll('.slider__out');

    view.upData({
      minMax: true,
      isTrackPostfix: false,
    });

    expect(out[0].innerHTML).toBe(`${view.state.min.toLocaleString()}`);
    expect(out[1].innerHTML).toBe(`${view.state.max.toLocaleString()}`);
  });

  test('there must be a separator that is set', () => {
    const out = view.slider.querySelectorAll('.slider__out');

    view.upData({
      separate: ',',
      minMax: true,
      max: 10000,
    });

    expect(out[0].innerHTML).toBe(`${view.state.min.toLocaleString()}${view.state.trackPostfix}`);
    expect(out[1].innerHTML).toBe(`${view.state.max.toLocaleString()}${view.state.trackPostfix}`);
  });

  test('isSeparate = false, then values ​​without a separator should be obtained', () => {
    const out = view.slider.querySelectorAll('.slider__out');

    view.upData({
      separate: ',',
      minMax: true,
      max: 10000,
      isSeparate: false,
    });

    expect(out[0].innerHTML).toBe(`${view.state.min.toString()}${view.state.trackPostfix}`);
    expect(out[1].innerHTML).toBe(`${view.state.max.toString()}${view.state.trackPostfix}`);
  });
});
