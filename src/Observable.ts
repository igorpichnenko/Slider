type EventCallback = (newData?: any) => void;

interface Callbacks {
  [key: string]: Array<EventCallback>
}

class Observable {
  private MassageMemory: Callbacks;
  
  constructor(){
    this.MassageMemory = {}
  }
  

  public getData(dataType: string, notification: EventCallback): void {
    
    this.MassageMemory[dataType] = [notification];
  }

  public sendData(dataType: string, newData?: object): void {
    const eventCallbacks = this.MassageMemory[dataType];

    if (eventCallbacks) {
      eventCallbacks.forEach((eventCallback: EventCallback) => {
        eventCallback(newData);
      });
    }
  }
}

export { Observable };
