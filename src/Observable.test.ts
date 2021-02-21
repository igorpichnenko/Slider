import { Observable } from './Observable';

test('subscriber gets new parameters', () => {
  const observable = new Observable();
  const callback = jest.fn();
  observable.subscribe('newData', callback);
  observable.notify('newData');
  expect(callback.mock.calls.length).toBe(1);
});


