import { Demo } from './Demo';
import './slider';
import { Options } from './interfaces';
import './demo';

const firstOptions: Partial<Options> = {
  orientation: 'vertical',
  type: 'double',
  isColorOut: true,
  onlyDivisions: true,
};
const twoOptions: Partial<Options> = {
  orientation: 'horizontal',
  type: 'double',
  gradient: 'red',
  color: 'white',
  min: 0,
  max: 15000,
  step: 1,
  from: 5000,
  to: 10000,
  fromTo: true,
};
const threeOptions: Partial<Options> = {
  orientation: 'vertical',
  type: 'double',
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
const fourOptions: Partial<Options> = {
  orientation: 'horizontal',
  type: 'single',
  isScale: false,
  isLabel: false,
  color: 'green',
};

const options = [firstOptions, twoOptions, threeOptions, fourOptions];

$(document).ready(() => {
  const $wrappers = $('.js-toxin-slider');

  $.each($wrappers, (key, wrapper) => (
    new Demo($(wrapper).slider(options[key]))
  ));
});
