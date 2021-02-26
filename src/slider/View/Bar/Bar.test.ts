import '@testing-library/jest-dom';
import $ from 'jquery';
import { View } from '../View';
import { standardOptions } from '../../interfaces/standardOptions';

describe('Bar', () => {
  let wrap: JQuery<HTMLElement>;
  let view: View;
  

  beforeEach(() => {
    wrap = $("<div class='js-toxin-slider' ></div>")
    wrap.appendTo( "body" )
    view = new View(standardOptions, wrap);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('bar horizontal is initialized and visible visible', () => {
    const bar = view.slider.querySelector('.slider__bar');

    expect(bar).toBeVisible();
  });

  test('if isGradient = false then the background of the bar must be the color of the variable', () => {
    const bar = view.slider.querySelector('.slider__bar') as HTMLElement;

    view.upData({ isGradient: false });

    expect(bar.style.background).toBe(view.state.color);
  });

  test('if the orientation is "vertical" bar should have a vertical modifier', () => {
    const newOptions = {
      ...standardOptions,
      orientation: 'vertical',
    };

    const newView = new View(newOptions, wrap);

    const bar = newView.slider.querySelector('.slider__bar_vertical');

    expect(bar).toBeVisible();
  });
});
