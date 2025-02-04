
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Dashboard from './dashboard';
import '@testing-library/jest-dom';

// Mocking the ProfileWidget component
jest.mock('./profile-widget', () => {
  return jest.fn(() => <div>Profile Widget</div>);
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    initializeApp: jest.fn(),
  };
});

// Mock useRouter hook
jest.mock('next/navigation', () => ({ useRouter: jest.fn()}))

describe('Dashboard Component', () => {
  let mockReplace: jest.Mock;

  beforeEach(() => {
    // Set up the mock for useRouter
    mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    // Spy on useAuthState and mock its return value
    jest.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([null, true]);

    render(<Dashboard />);

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('should redirect to sign-in page if no user is authenticated', async () => {
    // Spy on useAuthState and mock its return value with no user and not loading
    jest.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([null, false]);

    render(<Dashboard />);

    // Expect router.replace to be called to redirect to the sign-in page
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/sign-in'));
  });

  it('should render ProfileWidget when user is authenticated', () => {
    // Spy on useAuthState and mock an authenticated user
    const mockUser = { uid: '123', email: 'test@example.com' };
    jest.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([mockUser, false]);

    render(<Dashboard />);

    // Expect ProfileWidget to be rendered
    expect(screen.getByText('Profile Widget')).toBeInTheDocument();
  });

  it('should render "No data found" if no user and loading is complete', () => {
    // Spy on useAuthState and mock no user and not loading
    jest.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([null, false]);

    render(<Dashboard />);

    // Expect the "No data found" message to appear
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });
});
