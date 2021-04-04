import {
  IViewState,
} from '../interfaces/interfaces';

function correctSeparate(value: number, options: IViewState): string {
  const {
    isSeparate,
  } = options;
  let {
    separate,
  } = options;
  let val = '';

  if (isSeparate === false) {
    val = value.toString();
  } else {
    const separateEn = separate === ',';
    const separateDe = separate === '.';
    const separateDefault = separate === ' ';

    if (separateEn) {
      separate = 'en-US';
    }
    if (separateDe) {
      separate = 'de-DE';
    }
    if (separateDefault) {
      separate = undefined;
    }

    val = value.toLocaleString(separate);
  }
  return val;
}

export {
  correctSeparate,
};
