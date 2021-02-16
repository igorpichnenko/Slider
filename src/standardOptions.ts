import { Options } from './interfaces';

const standardOptions: Options = {
  className: '.js-toxin-slider',
 // orientation: 'vertical',
  orientation: 'horizontal',
  type: 'double',
  min: 0,
  max: 15000,
  step: 1,
  from: 5000,
  to: 10000,
  marker: '₽',
  isLabel: false,
  isScale: false,
  isOrientation: false,
};

export { standardOptions };
