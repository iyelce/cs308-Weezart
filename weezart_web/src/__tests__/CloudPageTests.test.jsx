import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this to extend expect functions
import CloudImport from '../Pages/ImportFile/CloudImport';
import CloudApi from '../API/CloudApi';
import userEvent from '@testing-library/user-event';



// Mock the CloudApi module
jest.mock('../API/CloudApi', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('CloudImport Component', () => {
    it('should update the state with user input', () => {
        render(<CloudImport />);
      
        const urlInput = screen.getByLabelText('URL:');
        const usernameInput = screen.getByLabelText('Username:');
        const passwordInput = screen.getByLabelText('Password:');
        const tableInput = screen.getByLabelText('Table:');
      
        userEvent.type(urlInput, 'test-url');
        userEvent.type(usernameInput, 'test-username');
        userEvent.type(passwordInput, 'test-password');
        userEvent.type(tableInput, 'test-table');
      
        expect(urlInput.value).toBe('test-url');
        expect(usernameInput.value).toBe('test-username');
        expect(passwordInput.value).toBe('test-password');
        expect(tableInput.value).toBe('test-table');
      });
  });