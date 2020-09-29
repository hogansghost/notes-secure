import React, { useContext } from 'react';
import { mount } from 'enzyme';
import { DarkModeContext, DarkModeProvider } from 'context/dark-mode-context';

describe("DarkModeContext (context)", () => {
  let TestComponent;

  beforeAll(() => {
    TestComponent = () => {
      const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

      const handleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
      }

      return (
        <>
          <div className="test-value">{isDarkMode.toString()}</div>
          <button className="test-action" onClick={handleDarkMode}>Toggle Dark Mode</button>
        </>
      );
    }
  });

  it('darkMode toggles between light and dark on bound context event to toggle.', () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });


    const wrapper = mount(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );

    expect(wrapper.find('.test-value').text()).toEqual('false');

    wrapper.find('.test-action').simulate('click');

    expect(wrapper.find('.test-value').text()).toEqual('true');
  });

  it('testtttttttt', () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });

    const wrapper = mount(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );

    expect(wrapper.find('.test-value').text()).toEqual('true');

    wrapper.find('.test-action').simulate('click');

    expect(wrapper.find('.test-value').text()).toEqual('false');
  });

  // ToDo, update the mock to allow triggering of dispatchEvents?
  it('it changes darkMode on the window preference changing', () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });

    const wrapper = mount(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>
    );

    expect(wrapper.find('.test-value').text()).toEqual('true');

    window.matchMedia().dispatchEvent(new Event('change'));
  });
});
