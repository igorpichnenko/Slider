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
  
  test('Min is expected to be less than max. And min becomes = -20 and max = -15', () => {
    const newOptions: Options = {
       ...standardOptions,
       min: -15,
       max: -20,
       step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.min).toBe(newOptions.max)
    expect(model.state.max).toBe(newOptions.min)
  })
  
  
  
  
})