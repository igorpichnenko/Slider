import { Presenter } from './Presenter/Presenter';
import { Options } from './interfaces/interfaces';
import { standardOptions } from './interfaces/standardOptions';

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    colorSlider(options?: Partial<Options>): Presenter
  }
}

(function ($) {
  $.fn.colorSlider = function init(options?: Partial<Options>): Presenter {
    const newOptions: Options = { ...standardOptions, ...options };

    const slider: Presenter = new Presenter(newOptions, this.get(0));
    return slider;
  };
}(jQuery));
