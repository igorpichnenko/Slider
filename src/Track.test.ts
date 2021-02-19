import '@testing-library/jest-dom';

import { View } from './View';
import { Options } from './interfaces';

const standardOptions: Options = {
  selector: '.js-toxin-slider',
  orientation: 'horizontal',
  type: 'double',
  min: 0,
  max: 10,
  step: 1,
  from: 3,
  to: 7,
  prefix: '₽',
  isLabel: true,
  isScale: true,
  color: 'orange',
  isScalePrefix: true,
  scalePrefix: '₽',
};

describe('Track', () => {
  const wrap: HTMLElement = document.createElement('div');
  wrap.className = 'js-toxin-slider';
  document.body.append(wrap);
  const view = new View(standardOptions);

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('track horizontal is initialized and visible', () => {
    const track = wrap.querySelector('.slider__track_horizontal');
    expect(track).toBeVisible();
    expect(view.convertPxToValue).toBeDefined();
  });

  test('clicking on the scale should update the coordinates', () => {
    const spy = jest.spyOn(view, 'convertPxToValue');
    const track = wrap.querySelector('.slider__track') as HTMLElement;
    track.click();

    expect(spy).toBeCalled();
  });
});
