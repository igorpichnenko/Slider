import '@testing-library/jest-dom';
import $ from 'jquery';

import { View } from '../View';
import { Scale } from './Scale';
import { standardOptions } from '../../interfaces/standardOptions';
import { IViewState, IOptions } from '../../interfaces/interfaces';
import { classNames } from '../../libs/classNames';

describe('Scale', () => {
  let wrap: JQuery<HTMLElement>;
  let view: View;
  let scale: Scale;
  let ViewState: IViewState;

  beforeEach(() => {
    wrap = $("<div class='js-toxin-slider' ></div>");
    wrap.appendTo('body');
    view = new View(standardOptions, wrap);

    ViewState = {
      size: 266,
      oneStep: 26.6,
      slider: view.slider,
      ...standardOptions,
    };
    scale = new Scale(ViewState);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should be initialized and visible', () => {
    const sliderScale = view.slider.querySelector(classNames.findScale);

    expect(sliderScale).toBeVisible();
  });

  test('scale divisions must be created', () => {
    const scaleMarker = view.slider.querySelector(classNames.findScaleValue);

    expect(scaleMarker).toBeVisible();
  });

  test('if the scale element is one, then by condition it is equal to max', () => {
    const scaleMarker = view.slider.querySelector(classNames.findScaleValue)! as HTMLElement;

    expect(scaleMarker.innerHTML).toBe(`${view.state.max}${view.state.scalePostfix}`);
  });
  test('clicking on the scale should return the scale value', () => {
    const scaleMarker = view.slider.querySelector(classNames.findScaleValue) as HTMLElement;

    const value = scaleMarker.innerHTML;

    const clickScale = jest.fn((event) => event.detail.value);

    view.slider.addEventListener('scaleclick', clickScale);

    scaleMarker.click();

    expect(clickScale.mock.calls.length).toBe(1);
    expect(clickScale.mock.results[0].value).toBe(value);
  });

  test('if onlyDivisions = true then the scale division must have the not-visible modifier', () => {
    view.upData({ onlyDivisions: true });

    const scaleMarker = view.slider.querySelector(classNames.findScaleValue) as HTMLElement;

    expect(scaleMarker.classList.contains(classNames.notVisible)).toBe(false);
  });

  test('should be postfix by default', () => {
    const scaleMarker = view.slider.querySelector(classNames.findScaleValue) as HTMLElement;

    expect(scaleMarker.innerHTML).toBe(`${view.state.max}${view.state.scalePostfix}`);
  });

  test('isScalePostfix = false, then there should be no marker', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      isScalePostfix: false,

    };

    const newView = new View(newOptions, wrap);

    const scaleMarker = newView.slider.querySelector(classNames.findScaleValue)!;

    expect(scaleMarker.innerHTML).toBe(String(newView.state.max));
  });

  test('isPrefix = true, must be prefix', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      isPrefix: true,
    };

    const newView = new View(newOptions, wrap);

    const scaleMarker = newView.slider.querySelector(classNames.findScaleValue)!;

    expect(scaleMarker.innerHTML).toBe(`${newView.state.scalePostfix}${newView.state.max}`);
  });

  test('there is a separator by default', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      max: 10000,
      isSeparate: false,
    };

    const newView = new View(newOptions, wrap);

    const scaleMarker = newView.slider.querySelector(classNames.findScaleValue)!;

    expect(scaleMarker.innerHTML).toBe(`${newView.state.max.toString()}${newView.state.scalePostfix}`);
  });

  test('if separate = ".", then the result should be equal to "de-DE" of the locale', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      max: 10000,
      separate: '.',
    };

    const newView = new View(newOptions, wrap);

    const scaleMarker = newView.slider.querySelector(classNames.findScaleValue)!;

    expect(scaleMarker.innerHTML).toBe(`${newView.state.max.toLocaleString('de-DE')}${newView.state.scalePostfix}`);
  });
  test('if separate = ",", then the result should be equal to "en-US" of the locale', () => {
    const newOptions = {
      ...standardOptions,
      max: 10000,
      separate: ',',
    };

    const newView = new View(newOptions, wrap);

    const scaleMarker = newView.slider.querySelector(classNames.findScaleValue)!;

    expect(scaleMarker.innerHTML).toBe(`${newView.state.max.toLocaleString('en-US')}${newView.state.scalePostfix}`);
  });

  test('must correctly read the incrimination', () => {
    const currentValue: number = scale.getIncrement(ViewState);
    expect(currentValue).toBe(2);
  });

  test('must calculate the percentage correctly', () => {
    const currentValue: number = scale.convertPxToPercent(26.6, ViewState);
    expect(currentValue).toBe(10);
  });
});
