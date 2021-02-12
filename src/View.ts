import { Options } from './interfaces'
import { Observable } from './Observable'

class View {
  public observable: Observable;
  public state: Options
  public thumbFirst: HTMLElement
  public slider: HTMLElement
  public scale: HTMLElement
  constructor(options: Options) {
    this.observable = new Observable();
    this.state = this.init(options);
    this.slider = this.createSlider(options)
    this.thumbFirst = this.createElements()
    
    this.createElements()
    this.scale = this.createScale()
  }

  private init(options: Options): Options {

    return options
  }
  public upData(newData: Options) {
    
    this.state = {
      ...newData
    };

  }
  private createSlider(options: Options): HTMLElement {

    let slider: HTMLElement = document.createElement('div')
    slider.className = 'slider'
    
    
    this.addEventListeners(slider);
    document.querySelector(options.className)!.append(slider)
    //  this.observable.sendData('newPositions', {max: max, to: to});
    return slider
  }
  private createElements(): HTMLElement {
    
  const { orientation } = this.state

  let thumbFirst = document.createElement('div');
  let thumbSecond = document.createElement('div');
  
  let track = document.createElement('div')
  let bar = document.createElement('div')

  bar.className = 'slider__bar slider__bar_horizontal';
  track.className = 'slider__track slider__track_horizontal';
  
  thumbSecond.classList.add(
      'slider__thumb',
      'slider__thumb_horizontal', 'slider__thumb_second',);
  thumbFirst.classList.add(
        'slider__thumb',
        'slider__thumb_horizontal',
        'slider__thumb_first', );

    track.append(bar)
    this.slider.append(thumbFirst);
    this.slider.append(thumbSecond);
    this.slider.append(track)
    
    
     return thumbFirst
  }
  private createScale(): HTMLElement{
    let scale = document.createElement('div')
    scale.className = 'slider__scale slider__scale_horizontal';

    this.slider.append(scale)
    this.addScaleMarker(scale)
    return scale
  }
  private addEventListeners(slider: HTMLElement) {

   /* const bindMouseDown = this.dragStart.bind(this);
    this.slider.addEventListener("touchstart", bindMouseDown);
    this.slider.addEventListener("mousedown", bindMouseDown);*/
    
    this.onTrackClick = this.onTrackClick.bind(this)
    slider.addEventListener('click', this.onTrackClick);
    
    
    
  }
  private onScaleClick(event: any): void {
    event.preventDefault()
    
    const { target } = event;

    if (!(target instanceof HTMLElement)) return;

    if (!target.classList.contains('slider__scale-value')) return;

    const value = Number(target.innerHTML);

    this.updatePosition(value);
  }
  
  private onTrackClick(event: any): void {

    const target = event.target;

    if (!/track|bar/.test(target.className)) return;

    const coordinate = event.clientX
    
    let value = this.convertPxToValue(coordinate)
    this.updatePosition(value);
  }
  private updatePosition(value: number, target?: HTMLElement): void{
    
    this.moveThumbAtValue(value,this.thumbFirst )
  }
  private convertPxToValue(coordinate: number): number {
    const { min, max, step, } = this.state;

    const oneStep = this.getOneStep();
    const startPosition = this.getSliderPosition();
    

    const px = coordinate - startPosition;

    if (px > this.getSliderSize()) return max;

    if (px < 0) return min;

    const value = Math.round(px / oneStep) * step + min;
  
    return value;
  }
  public getSliderPosition(): number {
    const position = this.slider.getBoundingClientRect().left
    
    return position
  }
  private getSliderSize(): number{
    
  let size = this.slider.getBoundingClientRect().width
    
    return size
  }
  private getOneStep(): number {
    const {  min,  max,  step } = this.state;
    
    const result = Math.ceil((max - min) / step);
    
    let oneStep = this.getSliderSize() / result;
    
    return oneStep
  }
  private moveThumbAtValue(value: number, element: HTMLElement): void {

    const coordinate = this.convertValueToPx(value);
    
    const position = this.convertPxToPercent(coordinate);

    element.style.left = `${position}%`;

  }
  private convertValueToPx(value: number): number {

    const {  min, max,step, } = this.state;

    if (value === max) return this.getSliderSize();

    const pxValue = Math.round((value - min) / step) * this.getOneStep();

    return pxValue;
  }
  private convertPxToPercent(value: number): number {

    return (value * 100) / this.getSliderSize()
  }
  private addScaleMarker(scale: HTMLElement): void {
    
    this.onScaleClick = this.onScaleClick.bind(this)
    scale.addEventListener('click', this.onScaleClick);
    const {  min,  max,  step, } = this.state;
    
    const inc = this.getIncrement(step);
    const pxInc = (inc / step) * this.getOneStep();
    const fragment = document.createDocumentFragment();

    let pxCurrent = 0;

    for (let current = min; current < max; current += inc) {
      if (pxCurrent > this.getSliderSize() - 50) break;
      this.createScaleMarker(fragment, current, pxCurrent);

      pxCurrent += pxInc;

    }

    this.createScaleMarker(fragment, max, this.getSliderSize());
    scale.append(fragment);
  }
  private getIncrement(step: number): number{
    const value = Math.ceil(this.getSliderSize() / this.getOneStep());
    const inc = Math.ceil(value / 5) * step;
    return inc;
    
  }
  private createScaleMarker(fragment: DocumentFragment, value: number, position: number): void {

    

    const scaleMarker = document.createElement('span');
    scaleMarker.className = 'slider__scale-value slider__scale-value_horizontal';
    scaleMarker.innerHTML = value.toString();
    fragment.append(scaleMarker);

    const offset = this.convertPxToPercent(position);
    
    scaleMarker.style.left = `${offset}%`;
  }
}



export { View }