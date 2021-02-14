interface Options {
  className: string,
  orientation: string,
  type: string,
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  marker: string,
}

interface ViewState extends Options{

  size: number,
  oneStep: number,
  sliderPos: number,
  slider: HTMLElement,

}

export { Options, ViewState };
