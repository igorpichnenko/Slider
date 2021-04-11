enum Direction{
  FORWARD,
  BACKWARD,
  TARGET_FORWARD,
  TARGET_BACKWARD
}

enum Events{
  NEW_DATA,
  NEW_POSITION
}

interface IGeneralSettings{
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  isVertical: boolean,
  isDouble: boolean
}

interface IPostfix{
  isPrefix: boolean,
  postfix: string,
  isPostfix: boolean,
  isTrackPostfix: boolean,
  trackPostfix: string,
  isScalePostfix: boolean,
  scalePostfix: string
}

interface IColor {
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

interface IVisibleSettings {
  isLabel: boolean,
  isScale: boolean,
  isSeparate: boolean,
  minMax: boolean,
  fromTo: boolean,
  onlyDivisions: boolean,
  separate: string | undefined

}

interface IViewState extends IOptions{

  size: number,
  oneStep: number,
  slider: HTMLElement,
}

interface IOptions extends IGeneralSettings, IVisibleSettings, IPostfix, IColor{}

export {
  IOptions, IViewState, Direction, Events,
};
