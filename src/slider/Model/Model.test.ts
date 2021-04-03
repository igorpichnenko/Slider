import { Model } from './Model';
import { standardOptions } from '../interfaces/standardOptions';
import { IOptions } from '../interfaces/interfaces';

describe('Model', () => {
  test('Model is created with default options', () => {
    const model: Model = new Model(standardOptions);
    expect(model.state.orientation).toBe(standardOptions.orientation);
    expect(model.state.type).toBe(standardOptions.type);
    expect(model.state.min).toBe(standardOptions.min);
    expect(model.state.max).toBe(standardOptions.max);
    expect(model.state.step).toBe(standardOptions.step);
    expect(model.state.from).toBe(standardOptions.from);
    expect(model.state.to).toBe(standardOptions.to);
    expect(model.state.postfix).toBe(standardOptions.postfix);
    expect(model.state.isPrefix).toBe(standardOptions.isPrefix);
    expect(model.state.isPostfix).toBe(standardOptions.isPostfix);
    expect(model.state.isLabel).toBe(standardOptions.isLabel);
    expect(model.state.isScale).toBe(standardOptions.isScale);
    expect(model.state.isSeparate).toBe(standardOptions.isSeparate);
    expect(model.state.color).toBe(standardOptions.color);
    expect(model.state.isScalePostfix).toBe(standardOptions.isScalePostfix);
    expect(model.state.scalePostfix).toBe(standardOptions.scalePostfix);
    expect(model.state.minMax).toBe(standardOptions.minMax);
    expect(model.state.fromTo).toBe(standardOptions.fromTo);
    expect(model.state.isTrackPostfix).toBe(standardOptions.isTrackPostfix);
    expect(model.state.trackPostfix).toBe(standardOptions.trackPostfix);
    expect(model.state.isColor).toBe(standardOptions.isColor);
    expect(model.state.changeColor).toBe(standardOptions.changeColor);
    expect(model.state.isChangeColor).toBe(standardOptions.isChangeColor);
    expect(model.state.isGradient).toBe(standardOptions.isGradient);
    expect(model.state.gradient).toBe(standardOptions.gradient);
    expect(model.state.gradientDeg).toBe(standardOptions.gradientDeg);
    expect(model.state.isColorOut).toBe(standardOptions.isColorOut);
    expect(model.state.onlyDivisions).toBe(standardOptions.onlyDivisions);
    expect(model.state.separate).toBe(standardOptions.separate);
    expect(model.state.allColors).toBe(standardOptions.allColors);
  });

  test('Min is expected to be less than max. And min becomes = -20 and max = -15 + step', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      min: -15,
      max: -20,
      step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.min).toBe(newOptions.min);
    expect(model.state.max).toBe(newOptions.min + newOptions.step);
  });
  test('step cannot be less than 0.1', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      min: 45,
      max: 5,
      step: 0,
    };
    const model = new Model(newOptions);
    expect(model.state.step).toBe(0.1);
  });

  test('max is always 1 step more than min', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      max: 10,
      min: 12,
      step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.min).toBe(newOptions.min);
    expect(model.state.max).toBe(newOptions.min + newOptions.step);
  });
  test('max cannot be less than min', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      min: 15,
      max: 5,
      step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.min).toBe(newOptions.min);
    expect(model.state.max).toBe(newOptions.min + newOptions.step);
  });
  test('from cannot be greater than to, from must be to - step', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      to: 7,
      from: 9,
      step: 2,
    };
    const model = new Model(newOptions);
    expect(model.state.to).toBe(newOptions.to);
    expect(model.state.from).toBe(newOptions.to - newOptions.step);
  });
  test('from should not be less than min', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      min: 0,
      from: -5,
      step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.from).toBe(newOptions.min);
  });
  test("to, can't be more max", () => {
    const newOptions: IOptions = {
      ...standardOptions,
      max: 10,
      to: 12,
      step: 1,
    };
    const model = new Model(newOptions);
    expect(model.state.to).toBe(newOptions.max);
  });
  test('max should be equal to minimum + step', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      min: -20,
      max: -60,
      step: 5,
    };
    const model = new Model(newOptions);
    expect(model.state.max).toBe(newOptions.min + newOptions.step);
  });
  test('step can be fractional', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      min: 0,
      max: 40,
      step: 1.4,
    };
    const model = new Model(newOptions);
    expect(model.state.step).toBe(newOptions.step);
  });
  test('fractions are expected to be difficult to correct', () => {
    const newOptions: IOptions = {
      ...standardOptions,
      min: 3.2,
      max: 2.4,
      step: 1.2,
    };
    const model = new Model(newOptions);
    expect(model.state.max).toBe(newOptions.min + newOptions.step);
  });
});
