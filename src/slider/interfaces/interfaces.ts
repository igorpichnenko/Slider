interface Options {
  orientation: string,
  type: string,
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  postfix: string,
  isPostfix: boolean,
  isLabel: boolean,
  isScale: boolean,
  isSeparate: boolean,
  color: string,
  isScalePostfix: boolean,
  scalePostfix: string,
  minMax: boolean,
  fromTo: boolean,
  isTrackPostfix: boolean,
  trackPostfix: string,
  isColor: boolean,
  changeColor: boolean,
  isChangeColor: boolean,
  isGradient: boolean,
  gradient: string,
  gradientDeg: number,
  isColorOut: boolean,
  onlyDivisions: boolean,
  separate: string | undefined,
  allColors: {[index: string]: string}
}

interface ViewState extends Options{

  size: number,
  oneStep: number,
  slider: HTMLElement,
}

export { Options, ViewState };
