import * as helper from './helper';

describe('helper', () => {
  it('should add', () => {
    const result = helper.add(2, 3);
    expect(result).toBe(5);
  });

  it('should minus', () => {
    const result = helper.minus(5, 3);
    expect(result).toBe(2);
  });
});
