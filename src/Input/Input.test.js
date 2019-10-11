import React from "react";
import { shallow } from "enzyme";
import Input from "./Input";
import { findByTestAttr, checkProps } from "../../test/testUtils";

const defaultProps = {
  secretWord: "party"
};

const setup = props => {
  const setupProps = { ...props, ...defaultProps };
  return shallow(<Input {...setupProps} />);
};

test("Input renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("does not throw warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
  let wrapper;
  let mockSetCurrentGuess = jest.fn();
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  });
  test("state updates with value of input box on change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("input box is cleared when submit button is clicked", () => {
    const submitBtn = findByTestAttr(wrapper, "submit-button");

    submitBtn.simulate("click", { preventDefault() {}});

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
