import { ColorModeContext, useMode } from '../Pages/Sidebar/theme';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';  // Import React module

describe('useMode hook', () => {
  it('toggles color mode', () => {
    // Mock the return value for useContext
    const mockSetMode = jest.fn();
    const mockUseMemo = jest.fn((callback) => {
      return callback();
    });

    const mockToggleColorMode = jest.fn(); // Define the variable here

    act(() => {
      jest.spyOn(React, 'useMemo').mockImplementation(mockUseMemo);
      jest.spyOn(React, 'useContext').mockReturnValue({
        toggleColorMode: mockToggleColorMode,
      });

      const TestComponent = () => {
        const [theme, colorMode] = useMode();
        return (
          <div>
            <div data-testid="mode">{theme.palette.mode}</div>
            <button onClick={colorMode.toggleColorMode}>Toggle Mode</button>
          </div>
        );
      };

      render(
        <ColorModeContext.Provider value={{ toggleColorMode: mockSetMode }}>
          <TestComponent />
        </ColorModeContext.Provider>
      );
    });

    // Check the initial mode
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');

    // Trigger the toggleColorMode function
    act(() => {
      userEvent.click(screen.getByText('Toggle Mode'));
    });

  });
});
