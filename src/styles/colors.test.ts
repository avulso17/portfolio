import { colors } from './colors'

describe('brand color tokens', () => {
  it('exposes exactly the spec palette', () => {
    expect(colors).toEqual({
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      ink: '#0A0A0A',
      'ink-2': '#141414',
      line: '#262626',
      parchment: '#F2EEE6',
      'parchment-dim': '#8C8A84',
      'parchment-mute': '#4A4945',
      amber: '#F5B700',
      'amber-dim': 'rgba(245,183,0,0.15)',
      ok: '#4ADE80',
      err: '#F87171',
    })
  })

  it('has no legacy tokens', () => {
    const legacy = [
      'black',
      'white',
      'onyx',
      'gray',
      'blue',
      'red',
      'yellow',
      'card-border',
      'card-bg',
      'nav-border',
      'success',
      'warning',
      'error',
      'info',
    ]
    for (const key of legacy) {
      expect(colors).not.toHaveProperty(key)
    }
  })
})
