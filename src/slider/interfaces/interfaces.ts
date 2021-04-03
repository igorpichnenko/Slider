interface GeneralSettings{
  orientation: string,
  type: string,
  min: number,
  max: number,
  step: number,
  from: number,
  to: number
}

interface Postfix{
  isPrefix: boolean,
  postfix: string,
  isPostfix: boolean,
  isTrackPostfix: boolean,
  trackPostfix: string,
  isScalePostfix: boolean,
  scalePostfix: string
}

interface Color {
  color: string,
  isChangeColor: boolean,
  isGradient: boolean,
  gradient: string,
  gradientDeg: number,
  isColorOut: boolean,
  changeColor: boolean,
  isColor: boolean,
  allColors: {[index: string]: string}
}

interface VisibleSettings {
  isLabel: boolean,
  isScale: boolean,
  isSeparate: boolean,
  minMax: boolean,
  fromTo: boolean,
  onlyDivisions: boolean,
  separate: string | undefined

}

interface ViewState extends Options{

  size: number,
  oneStep: number,
  slider: HTMLElement,
}

interface Options extends GeneralSettings, VisibleSettings, Postfix, Color{}

export { Options, ViewState };
