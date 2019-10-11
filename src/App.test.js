import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();

const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  // we use mount because useEffect cannot be called on `shallow` as of this date
  return mount(<App />);
};

test("renders without crashing", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

describe("getSecredWord calls", () => {
  test("getSecretWord gets called on App mount", () => {
    setup();

    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  })
});
