import { Options } from './interfaces';
import { allColors } from './color';

const standardOptions: Options = {
  orientation: 'horizontal',
  type: 'double',
  min: 0,
  max: 10,
  step: 1,
  from: 3,
  to: 7,
  postfix: '₽',
  isPostfix: true,
  isLabel: true,
  isScale: true,
  color: 'orange',
  isScalePostfix: true,
  scalePostfix: '₽',
  minMax: false,
  fromTo: false,
  isTrackPostfix: true,
  trackPostfix: '₽',
  isColor: true,
  changeColor: true,
  isChangeColor: true,
  isGradient: true,
  gradient: 'purple',
  gradientDeg: 45,
  isColorOut: false,
  onlyDivisions: false,
  prettify: true,
  separate: ' ',
  allColors,
};

export { standardOptions };
