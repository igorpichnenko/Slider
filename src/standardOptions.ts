import { Options } from './interfaces';
import { allColors } from './color';

const standardOptions: Options = {
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
  minMax: false,
  fromTo: false,
  isTrackPrefix: true,
  trackPrefix: '₽',
  isColor: true,
  changeColor: true,
  isGradient: true,
  gradient: 'purple',
  gradientDeg: 45,
  isColorOut: false,
  onlyDivisions: false,
  isDivision: true,
  allColors,
};

export { standardOptions };
