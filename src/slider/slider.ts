import {
  Presenter,
} from './Presenter/Presenter';
import {
  IOptions,
} from './interfaces/interfaces';
import {
  standardOptions,
} from './interfaces/standardOptions';
import './slider.scss';

(function initPlugin($) {
  ($.fn as any).colorSlider = function init(method?: {} | string) {
    const methods = {

      init($slider: JQuery < HTMLElement >, newParam: {}| undefined) {
        const newOptions: IOptions = {
          ...standardOptions, ...newParam,
        };

        $slider.data('presenter', new Presenter(newOptions, $slider));

        return $slider;
      },

      change($slider: JQuery < HTMLElement >, values: Partial < IOptions >) {
        if (typeof values === 'undefined') {
          return $slider.data('presenter');
        }
        $slider.data('presenter').setOptions(values);
        $slider.data('presenter').upDataView();
        return this;
      },

      getValue($slider: JQuery < HTMLElement >, func: (values: Partial < IOptions >) => void) {
        $slider.data('presenter').emitter.subscribe('newData', func);

        if (typeof func === 'undefined') {
          return this;
        }
        $slider.data('presenter').emitter.subscribe('newData', func);
        return this;
      },
    };
    const isMethod = typeof method === 'object' || !method;

    if (typeof method === 'string') {
      if (method === 'change') {
        return methods[method].call(this, this, arguments[1]);
      }

      if (method === 'getValue') {
        methods[method].call(this, this, arguments[1]);
      }
    }
    if (isMethod) {
      return methods.init(this, method);
    }
  };
}(jQuery));
