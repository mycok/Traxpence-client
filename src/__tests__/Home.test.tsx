import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import ReactTestUtils from 'react-dom/test-utils';
import Home from '../components/Home';

describe('Home component renders the first time a user visits the site', () => {
  it('renders signin and signup options', () => {
    render(<Home history="" />);
  });
});
