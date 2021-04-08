import { Demo } from './Demo/Demo';
import { IOptions } from '../slider/interfaces/interfaces';
import './index.scss';
import '../slider/slider';

const $wrap = $('.js-test');

$wrap.colorSlider({
  isScale: false,
  isChangeColor: false,

});

/**
 * Для вывода в свои инпуты
 * Создать инпуты, и вызвать метод getValue
   с функцией и выводить любой параметр из 27 обратившись через точку values.from
* */

$wrap.colorSlider('getValue', (values: IOptions) => {
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

const fiveOptions: Partial<IOptions> = {
  isScale: false,
  isLabel: false,
  color: 'green',
  isDouble: true,
};

const sixOptions: Partial<IOptions> = {

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
  onlyDivisions: false,
};

const options = [firstOptions, twoOptions, threeOptions, fourOptions, fiveOptions, sixOptions];

const $wrappers = $('.js-slider');

$wrappers.each((index, element) => {
  new Demo($(element).colorSlider(options[index]).colorSlider('change'));
});
