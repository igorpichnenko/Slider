import { EventEmitter } from './EventEmitter';

test('subscriber gets new parameters', () => {
  const emitter = new EventEmitter();
  const callback = jest.fn();
  emitter.subscribe('newData', callback);
  emitter.emit('newData');
  expect(callback.mock.calls.length).toBe(1);
});
