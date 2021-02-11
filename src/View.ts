import { Options } from './interfaces'
import { Observable } from './Observable'

class View {
  public observable: Observable;
  public state: Options
  
  public slider: HTMLElement
  
  constructor(options: Options){
    this.observable = new Observable();
    this.state = this.init(options);
    this.slider = this.createSlider(options)
   console.log(options)
  }
  
  private init(options: Options): Options {
   
    return options
  }
  
  public setState(upData: Options) {
    console.log(upData)


    
  }
  
  private createSlider(options: Options): HTMLElement{
    
    let slider: HTMLElement = document.createElement('div')
    slider.className = 'slider'
    document.querySelector(options.className)!.append(slider)
    let btn = document.querySelector('.btn')

    btn!.onclick = () =>{
   let to = -600
   let max = 1000
   
   
    this.observable.sendData('newPositions', {max: max, to: to});
  }
    
    return slider
  }
  
  
  
}

export { View }
