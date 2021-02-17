import { Options } from './interfaces';

const standardOptions: Options = {
  selector: '.js-toxin-slider',
  orientation: 'vertical',
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

export { standardOptions };
