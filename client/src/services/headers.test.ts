import * as headers from './headers';

describe('headers', () => {
  it('buildHeaders', () => {
    const expected = {
      headers: {
        header1: 'value 1',
        header2: 'value 2',
        header3: 'value 3',
      },
    };

    const result = headers.buildHeaders(
      { header1: 'value 1' },
      { header2: 'value 2' },
      { header3: 'value 3' },
    );

    expect(result).toEqual(expected);
  });
});
