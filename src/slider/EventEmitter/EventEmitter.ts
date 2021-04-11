import { IOptions, Events } from '../interfaces/interfaces';

type EventCallback = (data?: any) => void;

interface Callbacks {
  [key: string]: EventCallback[]
}

class EventEmitter {
  public events: Callbacks;

  constructor() {
    this.events = {};
  }

  public subscribe(eventName: Events, callback: EventCallback) {
    !this.events[eventName] && (this.events[eventName] = []);

    this.events[eventName].push(callback);
  }

  public emit(eventName: Events, newData?: Partial<IOptions>) {
    const event = this.events[eventName];

    event && event.forEach((callback) => callback.call(null, newData));
  }
}

export { EventEmitter };
