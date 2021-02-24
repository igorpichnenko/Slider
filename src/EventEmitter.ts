import { Options } from './interfaces';

type EventCallback = (data?: any) => void;

interface Callbacks {
  [key: string]: Array<EventCallback>
}

class EventEmitter {
  private events: Callbacks;

  constructor() {
    this.events = {};
  }

  public subscribe(eventName: string, callback: EventCallback): void {
    !this.events[eventName] && (this.events[eventName] = []);

    this.events[eventName].push(callback);
  }

  public unsubscribe(eventName: string, callback: EventCallback): void {
    this.events[eventName] = this.events[eventName].filter((eventCallback) => callback !== eventCallback);
  }

  public emit(eventName: string, newData?: Partial<Options>): void {
    const event = this.events[eventName];

    event && event.forEach((callback) => callback.call(null, newData));
  }
}

export { EventEmitter };
