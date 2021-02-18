import { Model } from './Model';
import { Options } from './interfaces';

const standardOptions: Options = {
  selector: '.js-toxin-slider',
  orientation: 'horizontal',
  type: 'double',
  min: 0,
  max: 10,
  step: 1,
  from: 3,
  to: 7,
  prefix: '₽',
  isLabel: true,
  isScale: true,
  color: 'orange',
  isScalePrefix: true,
  scalePrefix: '₽',
};

describe('Model', () => {
  
  test('Model is created with default options', () => {
    const model: Model = new Model(standardOptions);
    expect(model.state.selector).toBe(standardOptions.selector);
    expect(model.state.orientation).toBe(standardOptions.orientation);
    expect(model.state.type).toBe(standardOptions.type);
    expect(model.state.min).toBe(standardOptions.min);
    expect(model.state.max).toBe(standardOptions.max);
    expect(model.state.step).toBe(standardOptions.step);
    expect(model.state.from).toBe(standardOptions.from);
    expect(model.state.to).toBe(standardOptions.to);
    expect(model.state.prefix).toBe(standardOptions.prefix);
    expect(model.state.isLabel).toBe(standardOptions.isLabel);
    expect(model.state.isScale).toBe(standardOptions.isScale);
    expect(model.state.isScalePrefix).toBe(standardOptions.isScalePrefix);
    expect(model.state.scalePrefix).toBe(standardOptions.scalePrefix);
    expect(model.state.color).toBe(standardOptions.color);
  })
  
  test('Min is expected to be less than max. And min becomes = -20 and max = -15 + step', () => {
    const newOptions: Options = {
       ...standardOptions,
       min: -15,
       max: -20,
       step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.min).toBe(newOptions.min)
    expect(model.state.max).toBe(newOptions.min + newOptions.step)
  })
  test('step cannot be less than 1', () => {
    const newOptions: Options = {
       ...standardOptions,
       min: 45,
       max: 5,
       step: 0,
    };
    const model = new Model(newOptions);
    expect(model.state.step).toBe(1)
  })
  test('step cannot be more than 50%', () => {
    const newOptions: Options = {
       ...standardOptions,
       min: 0,
       max: 102,
       step: 54,
    };
    const { max } = newOptions
    const maxStep = Math.abs(max) / 2;
    const model = new Model(newOptions);
    expect(model.state.step).toBe(maxStep)
    expect(model.state.step).toBe(51)
  })
  test('max is always 1 step more than min', () => {
    const newOptions: Options = {
       ...standardOptions,
       max: 10,
       min: 12,
       step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.min).toBe(newOptions.min)
    expect(model.state.max).toBe(newOptions.min + newOptions.step)
  })
  test('max cannot be less than min', () => {
    const newOptions: Options = {
       ...standardOptions,
       min: 15,
       max: 5,
       step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.min).toBe(newOptions.min)
    expect(model.state.max).toBe(newOptions.min + newOptions.step)
  })
  test("from cannot be greater than to, from must be to - step", () => {
    const newOptions: Options = {
       ...standardOptions,
       to: 7,
       from: 9,
       step: 2,
    };
    const model = new Model(newOptions);
    expect(model.state.to).toBe(newOptions.to)
    expect(model.state.from).toBe(newOptions.to - newOptions.step)
  })
  test("from should not be less than min", () => {
    const newOptions: Options = {
       ...standardOptions,
       min: 0,
       from: -5,
       step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.from).toBe(newOptions.min)
  })
  test("to, can't be more max", () => {
    const newOptions: Options = {
       ...standardOptions,
       max: 10,
       to: 12,
       step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.to).toBe(newOptions.max)
  })
  test("max should be equal to minimum + step", () => {
    const newOptions: Options = {
      ...standardOptions,
      min: -20,
      max: -60,
      step: 5
    };
    const model = new Model(newOptions);
    expect(model.state.max).toBe(newOptions.min + newOptions.step)
  })
  test("step can be fractional", () => {
    const newOptions: Options = {
      ...standardOptions,
      min: 0,
      max: 40,
      step: 1.4
    };
    const model = new Model(newOptions);
    expect(model.state.step).toBe(newOptions.step)
  })
  test("fractions are expected to be difficult to correct", () => {
    const newOptions: Options = {
      ...standardOptions,
      min: 3.2,
      max: 2.4,
      step: 1.2
    };
    const model = new Model(newOptions);
    expect(model.state.max).toBe(newOptions.min + newOptions.step)
  })
})