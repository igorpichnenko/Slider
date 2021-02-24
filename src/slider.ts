import { standardOptions } from './standardOptions';
import { Options } from './interfaces';
import { Presenter } from './Presenter';

declare global {
  interface Window {
    $: JQuery;
  }

  interface JQuery {
    colorSlider(options?: Partial<Options>): Presenter

  }
}

$.fn.colorSlider = function init(options?: Partial<Options>): Presenter {
  
    const newOptions: Options = { ...standardOptions, ...options };
    
  return new Presenter(newOptions, this.get(0));
  };
