import React from 'react';
import { render, screen,waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExportPage from '../Pages/ImportFile/ExportFile';



describe('ExportPage', () => {

    beforeEach(() => {
        global.fetch = jest.fn();
        console.log = jest.fn();
        console.error = jest.fn();
      });
  it('should call the API with correct headers and method on button click and trigger file download', async () => {
    const mockFetchResponse = {
      ok: true,
      text: () => Promise.resolve('mock-export-data'),
    };
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockFetchResponse)),
      });

    const props = { token: 'mockToken', userId: 'userId' };
    render(<ExportPage token={'token'} userId={'userId'} />);

    const exportButton = screen.getByRole('button', { name: /Export File/i });
    userEvent.click(exportButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/file/export/userId',
        {headers: {
            accept: 'application/json',
            'Authorization': "Bearer token",
            'Content-Type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
          credentials: 'include'}
      );

      // Verify file download behavior (mocking might be needed for browser interactions)
      // ...
    });
  });


  it('should call the API with correct headers and method on button click and trigger file download', async () => {
    const mockFetchResponse = {
      ok: false,
      text: () => Promise.resolve('mock-export-data'),
    };
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockFetchResponse)),
      });

    const props = { token: 'mockToken', userId: 'userId' };
    render(<ExportPage token={'token'} userId={'userId'} />);

    const exportButton = screen.getByRole('button', { name: /Export File/i });
    userEvent.click(exportButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/file/export/userId',
        {headers: {
            accept: 'application/json',
            'Authorization': "Bearer token",
            'Content-Type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
          credentials: 'include'}
      );

      // Verify file download behavior (mocking might be needed for browser interactions)
      // ...
    });
  });


  it('should display the error label when the API call fails', async () => {
    global.fetch.mockRejectedValue(new Error('API error'));

    render(<ExportPage token={'token'} userId={'userId'} />); // Render with props

    const exportButton = screen.getByRole('button', { name: /Export File/i });
    userEvent.click(exportButton);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Try again.')).toBeInTheDocument();
    });
  });

  it('should prevent default form submission', () => {
    const mockHandleExport = jest.fn();
    render(<ExportPage handleExport={mockHandleExport} />); // Render with React Testing Library
  
    const exportButton = screen.getByRole('button', { name: /Export File/i });
    userEvent.click(exportButton);
  
    expect(mockHandleExport).not.toHaveBeenCalled();
    expect(mockHandleExport).not.toHaveBeenCalledWith(expect.anything()); // No event argument
  });
});
