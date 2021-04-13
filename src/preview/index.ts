import { Demo } from './Demo/Demo';
import { IOptions } from '../slider/interfaces/interfaces';
import './index.scss';
import '../slider/slider';

const firstOptions: Partial<IOptions> = {
  isVertical: true,
  isDouble: false,
  isColorOut: true,
  isScale: false,
};
const twoOptions: Partial<IOptions> = {
  gradient: 'red',
  color: '#6698db',
  max: 15000,
  from: 5000,
  to: 10000,
  fromTo: true,
  separate: '.',
  onlyDivisions: false,
};
const threeOptions: Partial<IOptions> = {
  isVertical: true,
  gradient: 'blue',
  color: 'yellow',
  postfix: '',
  scalePostfix: '',
  min: -5000,
  max: -100,
  step: 2,
  from: -4000,
  to: -700,
  changeColor: false,
  separate: ',',
  onlyDivisions: false,
};

const fourOptions: Partial<IOptions> = {

  isGradient: false,
  color: 'black',
  max: 1500,
  from: 500,
  to: 1000,
  fromTo: true,
  separate: ' ',
  postfix: '$',
  scalePostfix: '$',
  trackPostfix: '$',
  isPrefix: true,
  isColor: false,
  onlyDivisions: true,

};

const options = [firstOptions, twoOptions, threeOptions, fourOptions];

const $wrappers = $('.js-slider');

$wrappers.each((index, element) => {
  new Demo($(element).colorSlider(options[index]).colorSlider('change'));
});
