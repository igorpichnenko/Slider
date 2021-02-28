import { Presenter } from './Presenter/Presenter';
import { Options } from './interfaces/interfaces';
import { standardOptions } from './interfaces/standardOptions';
import './slider.scss';

(function initPlugin($) {
  ($.fn as any).colorSlider = function init(method?: {} | string) {
    const methods = {

      init($slider: JQuery<HTMLElement>, newParam: {}| undefined) {
        const newOptions: Options = { ...standardOptions, ...newParam };

        $slider.data('presenter', new Presenter(newOptions, $slider));

        return $slider;
      },

      change($slider: JQuery<HTMLElement>, values: Partial<Options>) {
        if (typeof values === 'undefined') {
          return $slider.data('presenter');
        }
        $slider.data('presenter').setOptions(values);
        $slider.data('presenter').upDataView();
        return this;
      },

      getValue($slider: JQuery<HTMLElement>, func: (values: Partial<Options>) => void) {
        $slider.data('presenter').emitter.subscribe('newData', func);

        if (typeof func === 'undefined') {
          return this;
        }
        $slider.data('presenter').emitter.subscribe('newData', func);
        return this;
      },
    };

    if (typeof method === 'string' && (method === 'change')) {
      return methods[method].call(this, this, arguments[1]);
    }

    if (typeof method === 'string' && (method === 'getValue')) {
      methods[method].call(this, this, arguments[1]);
    }

    if (typeof method === 'object' || !method) {
      return methods.init(this, method);
    }
  };
}(jQuery));
