import React from "react";
import { render } from "@testing-library/react";
// import ReactTestUtils from "react-dom/test-utils";
import App from '../App';

describe("App component", () => {
  it('renders a drawer element', () => {
    const RouteProps = {
      location: {},
      match: {},
      history: {}
    };
    const { getBy } = render(<App { ...RouteProps }/>);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
