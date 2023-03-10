import { nodeGtc } from '../src';

describe('api.basic', () => {
  test('normail single value case', () => {
    const res = nodeGtc({
      commands: [
        { label: 'Go to beta', value: 'beta', icon:'🆎' },
        { label: 'Go to production', value: 'prod' },
      ],
    }, 'beta');

    expect(res.icon).toBe('🆎');
  });
});
