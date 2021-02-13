type EventCallback = (data?: any) => void;

interface Callbacks {
  [key: string]: Array<EventCallback>
}

class Observable {
  
  private messageMemory: Callbacks
  
  constructor(){
    this.messageMemory = {};
  }
  

  public subscribe(dataType: string, notification: EventCallback): void {
    
   this.messageMemory[dataType] = [notification];
  }

  public notify(dataType: string, newData?: object): void {
    const messages = this.messageMemory[dataType];

    if (messages) {
      messages.forEach((message: EventCallback) => {
        message(newData);
      });
    }
  }
}

export { Observable };
