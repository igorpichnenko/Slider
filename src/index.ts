import { standardOptions } from './standardOptions';
// import { Options } from './interfaces';
import { Presenter } from './Presenter';

/*
const newOptions: Options = {
  min: 0,
  max: 10,
  step: 1,
  from: 3,
  to: 7,
};
*/

$(document).ready(() => {
  new Presenter(standardOptions);
});
