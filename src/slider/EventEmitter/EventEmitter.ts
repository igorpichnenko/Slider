import { Options } from '../interfaces/interfaces';

type EventCallback = (data?: any) => void;

interface Callbacks {
  [key: string]: Array<EventCallback>
}

class EventEmitter {
  public events: Callbacks;

  constructor() {
    this.events = {};
  }

  public subscribe(eventName: string, callback: EventCallback): void {
    !this.events[eventName] && (this.events[eventName] = []);
  
    this.events[eventName].push(callback);
  } 

  public emit(eventName: string, newData?: Partial<Options>): void {
    const event = this.events[eventName];

    event && event.forEach((callback) => callback.call(null, newData));
  }
}

export { EventEmitter };
