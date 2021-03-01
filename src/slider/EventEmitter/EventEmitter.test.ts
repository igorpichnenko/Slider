import { EventEmitter } from './EventEmitter';

test('on notification the function is called', () => {
  const emitter = new EventEmitter();
  const callback = jest.fn();
  emitter.subscribe('newData', callback);
  emitter.emit('newData', { from: 7 });
  expect(callback.mock.calls.length).toBe(1);
});

test('if there are no notifications, then there is no function call', () => {
  const emitter = new EventEmitter();
  const callback = jest.fn();
  emitter.subscribe('newData', callback);

  expect(callback.mock.calls.length).toBe(0);
});

test('if 2 notifications then 2 results', () => {
  const emitter = new EventEmitter();
  const callback = jest.fn();
  emitter.subscribe('newData', callback);

  emitter.emit('newData', { from: 3 });
  emitter.emit('newData', { to: 5 });

  expect(callback.mock.calls.length).toBe(2);
});
