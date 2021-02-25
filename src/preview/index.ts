import { Options } from '../slider/interfaces/interfaces';
import { Demo } from './Demo/Demo';
import './index.scss';


const firstOptions: Partial<Options> = {
  orientation: 'vertical',
  type: 'double',
  isColorOut: true,
  onlyDivisions: true,
};
const twoOptions: Partial<Options> = {
  gradient: 'red',
  color: 'white',
  max: 15000,
  from: 5000,
  to: 10000,
  fromTo: true,
};
const threeOptions: Partial<Options> = {
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
const fourOptions: Partial<Options> = {
  orientation: 'horizontal',
  type: 'single',
  isScale: false,
  isLabel: false,
  color: 'green',
};

const fiveOptions: Partial<Options> ={
  
}

const options = [firstOptions, twoOptions, threeOptions, fourOptions, fiveOptions];


const $wrappers = $('.js-toxin-slider');

$.each($wrappers, (key, wrap) => (
  new Demo($(wrap).colorSlider(options[key]))
));
