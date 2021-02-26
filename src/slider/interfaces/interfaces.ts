interface Options {
  orientation: string,
  type: string,
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  prefix: string,
  isPrefix: boolean,
  isLabel: boolean,
  isScale: boolean,
  color: string,
  isScalePrefix: boolean,
  scalePrefix: string,
  minMax: boolean,
  fromTo: boolean,
  isTrackPrefix: boolean,
  trackPrefix: string,
  isColor: boolean,
  changeColor: boolean,
  isChangeColor: boolean,
  isGradient: boolean,
  gradient: string,
  gradientDeg: number,
  isColorOut: boolean,
  onlyDivisions: boolean,
  prettify: boolean,
  allColors: {[index: string]: string}
}

interface ViewState extends Options{

  size: number,
  oneStep: number,
  slider: HTMLElement,
}

export { Options, ViewState };
