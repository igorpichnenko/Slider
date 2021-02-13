import { Options } from './interfaces'


class Bar {
  
 
 private element: HTMLElement
  
  constructor (options: Options){
    
    this.element = this.create(options)
    this.updateBar(options)
    
  }
  
 public updateState(options: Options){
    this.updateBar(options)
  }
  
  
  private create(options: Options): HTMLElement{
    let element = document.createElement('div')

  element.className = 'slider__bar slider__bar_horizontal';
  
  document.querySelector(options.className)!.append(element)
  
  
  return element
  }
  public getRollerPositions(options: Options): number[] {
    
  const slider = document.querySelector(options.className)!
  let rollers = slider.querySelectorAll('.slider__roller');
    

    const calculatePosition = (element: Element) => {
      
      const width = Number.parseInt(getComputedStyle(element).width, 10);

      return element.getBoundingClientRect().left + width / 2;
    };

    const rollersPositions = [calculatePosition(rollers[0]),
      calculatePosition(rollers[1])];

    return rollersPositions.sort((a, b) => a - b);
  
    
    
  }
  private updateBar(options: Options){
    
    
    const slider = document.querySelector(options.className)!
    
    const sliderPos = slider.getBoundingClientRect().left

    const rollerPositions = this.getRollerPositions(options);

    const size = slider.getBoundingClientRect().width

    
    const isHorizontal = options.orientation === "horizontal"
    const isSingle = options.type === "single"

    if (isSingle) {
      if (isHorizontal) {
        
        const end = ((Math.abs(rollerPositions[1] - sliderPos)) * 100) / size;
        
        this.element.style.left = '0%';
        this.element.style.width = `${end}%`;
      } else {
        const start =  ((Math.abs(rollerPositions[1] - sliderPos)) * 100) / size;
        const end = 100 - start;
        this.element.style.left = `${start}%`;
        this.element.style.width = `${end}%`;
      }
    } else {
      const start =  ((Math.abs(rollerPositions[0] - sliderPos)) * 100) / size;
      
      const length =  ((Math.abs(rollerPositions[1] - rollerPositions[0])) * 100) / size;

      this.element.style.left = `${start}%`;
      this.element.style.width = `${length}%`;
    }
  
  
   }
  
  
  
}

export { Bar }