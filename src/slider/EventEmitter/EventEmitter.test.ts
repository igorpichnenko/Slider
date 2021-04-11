import { EventEmitter } from './EventEmitter';
import { Events } from '../interfaces/interfaces';

test('on notification the function is called', () => {
  const emitter = new EventEmitter();
  const callback = jest.fn();
  emitter.subscribe(Events.NEW_DATA, callback);
  emitter.emit(Events.NEW_DATA, { from: 7 });
  expect(callback.mock.calls.length).toBe(1);
});

test('if there are no notifications, then there is no function call', () => {
  const emitter = new EventEmitter();
  const callback = jest.fn();
  emitter.subscribe(Events.NEW_DATA, callback);

  expect(callback.mock.calls.length).toBe(0);
});

test('if 2 notifications then 2 results', () => {
  const emitter = new EventEmitter();
  const callback = jest.fn();
  emitter.subscribe(Events.NEW_DATA, callback);

  emitter.emit(Events.NEW_DATA, { from: 3 });
  emitter.emit(Events.NEW_DATA, { to: 5 });

  expect(callback.mock.calls.length).toBe(2);
});
