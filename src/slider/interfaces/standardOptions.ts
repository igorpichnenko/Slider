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
  prefix: '₽',
  isPrefix: true,
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
  isChangeColor: true,
  isGradient: true,
  gradient: 'purple',
  gradientDeg: 45,
  isColorOut: false,
  onlyDivisions: false,
  prettify: true,
  allColors,
}; 

export { standardOptions };
