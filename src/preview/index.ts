import { Demo } from './Demo/Demo';
import { Options } from '../slider/interfaces/interfaces';
import './index.scss';
import '../slider/slider';

const $wrap = $('.js-test-slider');

$wrap.colorSlider({
  isScale: false,
  isChangeColor: false,

});

/**
 * Для вывода в свои инпуты
 * Создать инпуты, и вызвать метод getValue
   с функцией и выводить любой параметр из 27 обратившись через точку values.from
* */

$wrap.colorSlider('getValue', (values: Options) => {
  $('.js-custom-from').val(values.from);
  $('.js-custom-to').val(values.to);
});

/**
 * Для изменения на custom-button
 * Вызыать метод change с необходимыми параметрами
* */

$('.js-custom-btn').click(() => {
  $wrap.colorSlider('change', {
    color: 'red', gradient: 'blue', max: 1000, from: 200, to: 800, onlyDivisions: true, fromTo: true,
  });
});

//      ***  Дэмо станица   ***

const firstOptions: Partial<Options> = {
  orientation: 'vertical',
  type: 'double',
  isColorOut: true,
  onlyDivisions: true,
};
const twoOptions: Partial<Options> = {
  gradient: 'red',
  color: '#6698db',
  max: 15000,
  from: 5000,
  to: 10000,
  fromTo: true,
  separate: '.',
};
const threeOptions: Partial<Options> = {
  orientation: 'vertical',
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

};

const fourOptions: Partial<Options> = {

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
};

const fiveOptions: Partial<Options> = {
  orientation: 'horizontal',
  type: 'single',
  isScale: false,
  isLabel: false,
  color: 'green',
};


const sixOptions: Partial<Options> = {

  gradient: 'black',
  color: '#900202',
  max: 1500.5,
  from: 500.2,
  to: 1000.3,
  step: 3.7,
  min: -100.2,
  separate: '.',
  postfix: '€',
  scalePostfix: '€',
  trackPostfix: '€',
  isColor: false,

};

const options = [firstOptions, twoOptions, threeOptions, fourOptions, fiveOptions, sixOptions];

const $wrappers = $('.js-toxin-slider');

$wrappers.each((index, element) => {
  new Demo($(element).colorSlider(options[index]).colorSlider('change'));
});
