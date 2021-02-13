import { Options } from './interfaces'
import { Observable } from './Observable'

class Scale {
  public observable: Observable;
  
  private scale: HTMLElement
  private options: Options
  
  constructor(options: Options){
    
    this.observable = new Observable();
    this.scale = this.create(options)
    this.addScaleMarker(this.scale,options)
    this.options = options
  }
  
  
  private create(options: Options): HTMLElement{
    let scale = document.createElement('div')
    scale.className = 'slider__scale slider__scale_horizontal';

    document.querySelector(options.className)!.append(scale)
    
    return scale
  }
  
  private addScaleMarker(scale: HTMLElement,options: Options): void {
    
    this.onScaleClick = this.onScaleClick.bind(this)
    scale.addEventListener('click', this.onScaleClick);
    const {  min,  max,  step, } = options
    
    const inc = this.getIncrement(step,options);
    const pxInc = (inc / step) * this.getOneStep(options);
    const fragment = document.createDocumentFragment();

    let pxCurrent = 0;

    for (let current = min; current < max; current += inc) {
      if (pxCurrent > this.getSliderSize(options) - 50) break;
      this.createScaleMarker(fragment, current, pxCurrent,options);

      pxCurrent += pxInc;

    }

    this.createScaleMarker(fragment, max, this.getSliderSize(options),options);
    scale.append(fragment);
  }
  private getIncrement(step: number, options: Options): number{
    const value = Math.ceil(this.getSliderSize(options) / this.getOneStep(options));
    const inc = Math.ceil(value / 5) * step;
    return inc;
    
  }
  private createScaleMarker(fragment: DocumentFragment, value: number, position: number,options: Options): void {

    const scaleMarker = document.createElement('span');
    scaleMarker.className = 'slider__scale-value slider__scale-value_horizontal';
    scaleMarker.innerHTML = value.toString();
    fragment.append(scaleMarker);

    const offset = this.convertPxToPercent(position, options);
    
    scaleMarker.style.left = `${offset}%`;
  }
  
  private convertPxToPercent(value: number, options: Options): number {

    return (value * 100) / this.getSliderSize(options)
  }
  
  private getSliderSize(options: Options): number{
    
    return document.querySelector(options.className)!.getBoundingClientRect().width
  }
  private getOneStep(options: Options): number {
    const {  min,  max,  step } = options
    
    const result = Math.ceil((max - min) / step);
    
    return this.getSliderSize(options) / result;
  }
  
  
  private onScaleClick(event: any): void {
    event.preventDefault()
    
    const { target } = event;

    if (!(target instanceof HTMLElement)) return;

    if (!target.classList.contains('slider__scale-value')) return;

    const value = Number(target.innerHTML);

    this.updateRollerPosition(value);
  }
  private updateRollerPosition(value: number):void{
    
    const {  from, to, max} = this.options;
    const fromDistance = Math.abs(from - value);
    const toDistance = Math.abs(to - value);
    
    
    
    if (fromDistance * toDistance === 0) return;

   
    let  isFrom = (fromDistance < toDistance) ? 'from': 'to';
   
    if (isFrom === 'from') {
     
    this.observable.notify('scalePos', {from: value});
    
  }else{
    this.observable.notify('scalePos', {to: value});
  }
}

}
export { Scale }