import { Presenter } from './Presenter/Presenter';
import { Options } from './interfaces/interfaces';
import { standardOptions } from './interfaces/standardOptions';
import './slider.scss';

(function ($) {
  $.fn.colorSlider = function init(options?: Partial<Options>): Presenter {
    const newOptions: Options = { ...standardOptions, ...options };

    const presenter: Presenter = new Presenter(newOptions, this.get(0));
    return presenter;
  };
}(jQuery));




