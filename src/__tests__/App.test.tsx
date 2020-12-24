import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import ReactTestUtils from 'react-dom/test-utils';
import App from '../App';

describe('App component', () => {
  it('renders a drawer element', () => {
    render(<App />);
  });
});
