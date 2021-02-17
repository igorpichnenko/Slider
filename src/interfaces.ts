interface Options {
  selector: string,
  orientation: string,
  type: string,
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  prefix: string,
  isLabel: boolean,
  isScale: boolean,
  color: string,
  isScalePrefix: boolean,
  scalePrefix: string,
}

interface ViewState extends Options{

  size: number,
  oneStep: number,
  sliderPos: number,
  slider: HTMLElement,

}

export { Options, ViewState };
