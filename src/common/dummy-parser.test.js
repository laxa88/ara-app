import * as parser from './dummy-parser';

describe('parser', () => {
  it('should add', () => {
    const result = parser.add(1, 2);
    expect(result).toBe(3);
  });
});
