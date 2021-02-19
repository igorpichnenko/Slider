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

describe('View', () => {
  const wrap: HTMLElement = document.createElement('div');
  wrap.className = 'js-toxin-slider';
  document.body.append(wrap);

  const view = new View(standardOptions);

  test('init', () => {
    expect(view.convertPxToValue).toBeDefined();
  });
});
