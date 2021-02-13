import { Options } from './interfaces'

class Track {
  
  constructor(options: Options){
    this.create(options)
    
  }
 
 private create(options: Options){
    
    let track = document.createElement('div')
  
  track.className = 'slider__track slider__track_horizontal';
  
    document.querySelector(options.className)!.append(track)
    
  }
  
  
}

export { Track }