import React from 'react';
import { render } from '@testing-library/react'
import Logo from './Logo';

// logo應該要符合快照
describe('logo unit test', () => {
  it('should match snapshot', () => {
    const {asFragment} = render(<Logo />);
    expect(asFragment()).toMatchSnapshot();
  })
})