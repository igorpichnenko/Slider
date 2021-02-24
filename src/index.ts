import { Demo } from './Demo';
import { Presenter } from './Presenter';
import { Options } from './interfaces';
import { allColors } from './color';
import './demo.scss';

const firstOptions: Options = {
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
  isGradient: true,
  gradient: 'purple',
  gradientDeg: 45,
  allColors,
  orientation: 'vertical',
  type: 'double',
  isColorOut: true,
  onlyDivisions: true,
};
const twoOptions: Options = {
  orientation: 'horizontal',
  type: 'double',
  min: 0,
  step: 1,
  prefix: '₽',
  isPrefix: true,
  isLabel: true,
  isScale: true,
  isScalePrefix: true,
  scalePrefix: '₽',
  minMax: false,
  isTrackPrefix: true,
  trackPrefix: '₽',
  isColor: true,
  changeColor: true,
  isGradient: true,
  gradientDeg: 45,
  isColorOut: false,
  onlyDivisions: false,
  allColors,
  gradient: 'red',
  color: 'white',
  max: 15000,
  from: 5000,
  to: 10000,
  fromTo: true,
};
const threeOptions: Options = {
  type: 'double',
  isPrefix: true,
  isLabel: true,
  isScale: true,
  isScalePrefix: true,
  minMax: false,
  fromTo: false,
  isTrackPrefix: true,
  trackPrefix: '₽',
  isColor: true,
  isGradient: true,
  gradientDeg: 45,
  isColorOut: false,
  onlyDivisions: false,
  allColors,
  orientation: 'vertical',
  gradient: 'blue',
  color: 'yellow',
  scalePrefix: '$',
  prefix: '$',
  min: -5000,
  max: -100,
  step: 2,
  from: -4000,
  to: -700,
  changeColor: false,

};
const fourOptions: Options = {
  min: 0,
  max: 10,
  step: 1,
  from: 3,
  to: 7,
  prefix: '₽',
  isPrefix: true,
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
  allColors,
  orientation: 'horizontal',
  type: 'single',
  isScale: false,
  isLabel: false,
  color: 'green',
};

const options = [firstOptions, twoOptions, threeOptions, fourOptions];

$(document).ready(() => {
  const $wrappers = $('.js-toxin-slider');
  $wrappers.each((index, element) => {
    const slider = new Presenter(options[index], element);
    new Demo(slider);
  });
});
