import React from "react";
import { render } from "@testing-library/react";
// import ReactTestUtils from "react-dom/test-utils";
import App from '../App';

describe("App component", () => {
  it('renders a drawer element', () => {
    const component = render(<App />);
    const drawer = component;
    expect(drawer).toBeInTheDocument;
  });
});
