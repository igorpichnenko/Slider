import { standardOptions } from './standardOptions';
import { Presenter } from './Presenter';

$('.js-btn').click(() => {
  new Presenter(standardOptions);
});
