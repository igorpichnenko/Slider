import { Options } from '../slider/interfaces/interfaces';
import { Demo } from './Demo/Demo';
import './index.scss';
import '../slider/slider';


/** 
 * Для управления своей custom button
 * Записываем слайдер с переменную и потом обновляем тот параметр который нужно
 * пересобираем слайдер
**/
const slider = $('.js-test-slider').colorSlider({
  isChangeColor: false,
  onlyDivisions: true,
})

$('.js-custom-btn').click(() => {
  
slider.setOptions({color: "red", gradient: "blue", max: 1000, from: 200, to: 800, isScale:false, fromTo: true})
slider.upDataView()

})

/** для вывода информации в свои инпуты нужно:
   * создать инпуты
   * создать функцию
   * подписаться на получение актуальных параметров из слайдера
   * slider.emitter.subscribe('newData', upData);
**/

let from = document.querySelector('.custom-from')! as HTMLInputElement
let to = document.querySelector('.custom-to')! as HTMLInputElement 

function upData(upData: Options){
 
from.value = String(upData.from)
to.value = String(upData.to)
}

slider.emitter.subscribe('newData', upData);




/** 
 * Для класса Дэмо создаем 4 набора параметров
 * И передаем в Дэмо результат функции colorSlider
**/

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


const options = [firstOptions, twoOptions, threeOptions, fourOptions];

const $wrappers = $('.js-toxin-slider');

$.each($wrappers, (key: number, wrap: Element) => (
  new Demo($(wrap).colorSlider(options[key]))
));



