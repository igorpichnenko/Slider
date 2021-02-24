import { standardOptions } from './standardOptions';
import { Options } from './interfaces';
import { Presenter } from './Presenter';

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    slider(options?: Partial<Options>): Presenter

  }
}


  $.fn.slider = function init(options?: Partial<Options>): Presenter {
    const newOptions: Options = { ...standardOptions, ...options };

    const slider: Presenter = new Presenter(newOptions, this.get(0));

    return slider;
  };

