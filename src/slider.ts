import { standardOptions } from './standardOptions';
import { Demo } from './Demo';
import { Options } from './interfaces';
import { Presenter } from './Presenter';

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    slider(options: Options): Presenter
  }
}

$.fn.slider = function init(options: Options): Presenter {
  const presenter = new Presenter(options, this.get(0));

  return presenter;
};

$(document).ready(() => {
  const $wrapper = $('.js-toxin-slider');

  new Demo($wrapper.slider(standardOptions));
});
