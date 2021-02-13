import { Options } from './interfaces'

class Roller{
   private rollerFirst: HTMLElement
   private rollerSecond: HTMLElement
  
  constructor(options: Options){
    
    this.rollerFirst = this.createRollerFirst(options)
    this.rollerSecond = this.createRollerSecond(options)
    
    this.moveRollersAtValue( options.from,this.rollerFirst, options)
    this.moveRollersAtValue( options.to,this.rollerSecond, options)
  }
  
  public updateState(options: Options, target?: HTMLElement){
    
    const {  from, to } = options;
    
    this.moveRollersAtValue(from, this.rollerFirst,options)
    

    this.moveRollersAtValue(to, this.rollerSecond,options)
     
    
  }
  
  private createRollerFirst(options: Options): HTMLElement {

  let rollerFirst = document.createElement('div');
  
  rollerFirst.classList.add(
        'slider__roller',
        'slider__roller_horizontal',
        'slider__roller_first', );

    
    document.querySelector(options.className)!.append(rollerFirst)
    
     return rollerFirst
  }
  
  private createRollerSecond(options: Options): HTMLElement{
    let rollerSecond = document.createElement('div');

    rollerSecond.classList.add(
      'slider__roller',
      'slider__roller_horizontal', 'slider__roller_second',);
      
    document.querySelector(options.className)!.append(rollerSecond)
    
    return rollerSecond
  }
  
  
  private moveRollersAtValue(value: number, element: HTMLElement, options: Options): void {

    const position = this.convertValueToProcent(value,options);
    
   element.style.left = `${position}%`;

  }
  
  private convertValueToProcent(value: number,options: Options): number {

    const {  min, max,step, className} = options
    
    const slider = document.querySelector(className)!

   const size = slider.getBoundingClientRect().width

    const result = Math.ceil((max - min) / step);
    
    const oneStep = size / result;

    if (value === max) return size

    const pxValue = Math.round((value - min) / step) * oneStep

  return (pxValue * 100) / size
  }
  
  
}

export { Roller }