import { Options, ViewState } from './interfaces'
import { Observable } from './Observable'
import { Roller } from './Roller'
import { Track } from './Track'
import { Scale } from './Scale'
import { Bar } from './Bar'


class View {
  public observable: Observable;
  private state: Options
  private slider: HTMLElement
  private bar: Bar
  private rollers: Roller
  private scale: Scale

  constructor(options: Options) {
    this.observable = new Observable();
    this.state = this.init(options);
    this.slider = this.createSlider(options)
    
    this.createComponents(options)
    this.rollers = this.createRollers(options)
    this.bar = this.createBar(options)
    
    this.scale = this.createScale(options)
    
    this.addSubscription()
  }
  
  private init(options: Options): Options {

    return options
  }
  
  
  public setState(newState: Partial<Options>): void{
    
    console.log(newState)
    
    const updatedState: Options = { ...this.state, ...newState };
    
    
    this.rollers.updateState(updatedState)
    this.bar.updateState(updatedState)
    
   // this.observable.notify('newViewState', updatedState);
   
  }
  
  
  private createComponents(options: Options): void{
    
    new Track(options)
    
    
  }
 private createBar(options: Options): Bar{
    return  new Bar(options)
  }
  
  private createRollers(options: Options): Roller{
    
    return new Roller(options)
  }
  private createScale(options: Options): Scale{
    
    return new Scale(options)
  }
  
  private createSlider(options: Options): HTMLElement {

    let slider = document.querySelector(options.className)! as HTMLElement
    slider.classList.add('slider')
    
    
    this.addEventListeners(slider);
  
    
    return slider
  }
  private addEventListeners(slider: HTMLElement) {
    
    
    
    const bindMouseDown = this.dragStart.bind(this);
    slider.addEventListener("touchstart", bindMouseDown);
    slider.addEventListener("mousedown", bindMouseDown);
    
    this.onTrackClick = this.onTrackClick.bind(this)
    slider.addEventListener('click', this.onTrackClick);
    
    
    
  }
  
  
  private addSubscription(){
    this.newScalePos = this.newScalePos.bind(this)
    
   this.scale.observable.subscribe('scalePos', this.newScalePos);
  }
  
  private newScalePos(options: Options){
    const { from, to } = options
    
    this.observable.notify('newFromTo', {from: from});
  
    this.observable.notify('newFromTo', {to: to});
  }
  private dragStart(event: any) {
    
    const target = event.target;
    

    if (this.getTargetType(target)) {

      const drag = this.drag.bind(this, target);

      const handleUp = () => {
    
        target.removeEventListener("mousemove", drag);
        target.removeEventListener("touchmove", drag);
        document.removeEventListener("mouseup", handleUp);
        document.removeEventListener("touchend", handleUp);
      };

      target.addEventListener("mousemove", drag);
      target.addEventListener("touchmove", drag);
      document.addEventListener("mouseup", handleUp);
      document.addEventListener("touchend", handleUp);
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
    
    const rollers = this.slider.querySelectorAll('.slider__roller');
   
    if (rollers[0]) {
      if (rollers[0].contains(target)) return "from";
    }
    if (rollers[1].contains(target)){
      
    return "to";
      
    }else {
      return "undefined"
    }
    
  }
  
  private onTrackClick(event: any): void {
  event.preventDefault();
    const target = event.target;

    if (!/track|bar/.test(target.className)) return;

    const coordinate = event.clientX
    
    let value = this.convertPxToValue(coordinate)
    this.updatePosition(value);
  }
  
  
  private updatePosition(value: number, target?: HTMLElement): void{
  console.log(this.state)

    const fromDistance = Math.abs(this.state.from - value);
    const toDistance = Math.abs(this.state.to - value);
    const isSingle = this.state.type === "single";


    if (isSingle && fromDistance) {
    this.observable.notify('newFromTo', {from: value});
        
      return;
    }
    
    if (fromDistance * toDistance === 0) return;

    if (!target) {
     let isFrom = (fromDistance < toDistance) ? 'from': 'to';
    
    if (isFrom === 'from') {
      if (this.state.to > value) {
    this.observable.notify('newFromTo', {from: value});
      }
    }else if (this.state.from < value) {
    this.observable.notify('newFromTo', {to: value});
    }
  }else{
    const type = this.getTargetType(target);
    if (type === "from"){
     if (value > this.state.to) {
         value = this.state.from
        } 
    this.observable.notify('newFromTo', {from: value});
    }else{
      if (value < this.state.from) {
          value = this.state.to
        }
    this.observable.notify('newFromTo', {to: value});
  }
 }

    
    
    
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
  private getSliderPosition(): number {
    const position = this.slider.getBoundingClientRect().left
    
    return position
  }
  private getSliderSize(): number{
    
  
    
    return this.slider.clientWidth 
  }
  private getOneStep(): number {
    const {  min,  max,  step } = this.state;
    
    const result = Math.ceil((max - min) / step);
    
    return this.getSliderSize() / result;
  }
  
  
}



export { View }