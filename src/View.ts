import { Options } from './interfaces'
import { Observable } from './Observable'

class View {
  public observable: Observable;
  public state: Options
  public thumbFirst: HTMLElement
  public thumbSecond: HTMLElement
  public slider: HTMLElement
  public scale: HTMLElement
  public bar: HTMLElement
  public track: HTMLElement

  constructor(options: Options) {
    this.observable = new Observable();
    this.state = this.init(options);
    this.slider = this.createSlider(options)
    this.thumbFirst = this.createThumbFirst()
    this.thumbSecond = this.createThumbSecond()
    this.track = this.createTrack()
    this.bar = this.createBar(this.track)
    this.scale = this.createScale()
    this.startPosition()
    
    
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
    
    return slider
  }
  private createThumbFirst(): HTMLElement {

  let thumbFirst = document.createElement('div');
  
  thumbFirst.classList.add(
        'slider__thumb',
        'slider__thumb_horizontal',
        'slider__thumb_first', );

    
    this.slider.append(thumbFirst);
    
    
    
    
     return thumbFirst
  }
  private createTrack(): HTMLElement{
    let track = document.createElement('div')
  
  track.className = 'slider__track slider__track_horizontal';
  
    this.slider.append(track)
    
    return track
  }
  private createThumbSecond(): HTMLElement{
    let thumbSecond = document.createElement('div');

    thumbSecond.classList.add(
      'slider__thumb',
      'slider__thumb_horizontal', 'slider__thumb_second',);
      
    this.slider.append(thumbSecond);
    
    return thumbSecond
  }
  private createScale(): HTMLElement{
    let scale = document.createElement('div')
    scale.className = 'slider__scale slider__scale_horizontal';

    this.slider.append(scale)
    this.addScaleMarker(scale)
    return scale
  }
  public createBar(element: HTMLElement): HTMLElement{
    let bar = document.createElement('div')

  bar.className = 'slider__bar slider__bar_horizontal';
  
  element.append(bar)
  
  
  return bar
  }
  private addEventListeners(slider: HTMLElement) {
    const bindMouseDown = this.dragStart.bind(this);
    slider.addEventListener("touchstart", bindMouseDown);
    slider.addEventListener("mousedown", bindMouseDown);
    
    this.onTrackClick = this.onTrackClick.bind(this)
    slider.addEventListener('click', this.onTrackClick);
    
  }
  private dragStart(event: any): void{
    const target = event.target;

    if (this.getTargetType(target)) {

      const drag = this.drag.bind(this, target);

      const handleMouseUp = () => {

        this.slider.removeEventListener("mousemove", drag);
        this.slider.removeEventListener("touchmove", drag);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchend", handleMouseUp);
      };

      this.slider.addEventListener("mousemove", drag);
      this.slider.addEventListener("touchmove", drag);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleMouseUp);
    }
  }
  private drag(target: HTMLElement, event: any): void {
    
    let mouseValue = 0
    
      if (event.type === "touchmove") {

        mouseValue = this.convertPxToValue(event.touches[0].clientX);

      } else {
        mouseValue = this.convertPxToValue(event.clientX);
      }
   
      
    this.updatePosition(mouseValue, target);

  }
  private getTargetType(target: HTMLElement): string {
    if (this.thumbFirst) {
      if (this.thumbFirst.contains(target)) return "from";
    }
    if (this.thumbSecond.contains(target)){
      
    return "to";
      
    }else {
      return "undefined"
    }
    
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
    
   this.moveThumbAtValue(value,this.thumbFirst)
  this.observable.sendData('newPositions', {from: value});
  this.updateBar()
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
  private getThumbsPositions(): number {
   
      const width = Number.parseInt(getComputedStyle(this.thumbFirst).width, 10);
      return this.thumbFirst.getBoundingClientRect().left + width / 2;
    
    }
  private updateBar(): void{

    
    const thumbsPositions = this.getThumbsPositions();

    const sliderPosition = this.getSliderPosition();

        const end = this.convertPxToPercent(Math.abs(thumbsPositions - sliderPosition));

        this.bar.style.width = '0%';
        this.bar.style.width = `${end}%`;
     
        

  }
  private startPosition(): void{
    const { to, from } = this.state 
    
    this.moveThumbAtValue(from, this.thumbFirst)
    this.moveThumbAtValue(to, this.thumbSecond)
    
    this.updateBar()
  }
}



export { View }