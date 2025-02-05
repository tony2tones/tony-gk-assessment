import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Dashboard from './dashboard';
import '@testing-library/jest-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import the hook

// Mocking the ProfileWidget component
jest.mock('./profile-widget', () => {
  return jest.fn(() => <div>Profile Widget</div>);
});

// Mock Firebase and the hook
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  initializeApp: jest.fn(),
}));

// Mock useRouter hook
jest.mock('next/navigation', () => ({ useRouter: jest.fn()}));

// Mock useAuthState
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

describe('Dashboard Component', () => {
  let mockReplace: jest.Mock;

  beforeEach(() => {
    // Set up the mock for useRouter
    mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    // Mock useAuthState to return loading state
    (useAuthState as jest.Mock).mockReturnValue([null, true]);

    render(<Dashboard />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should redirect to sign-in page if no user is authenticated', async () => {
    // Mock useAuthState to return no user, not loading
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    render(<Dashboard />);

    // Expect router.replace to be called to redirect to the sign-in page
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/sign-in'));
  });

  it('should render ProfileWidget when user is authenticated', () => {
    // Mock useAuthState to return an authenticated user
    const mockUser = { uid: '123', email: 'test@example.com' };
    (useAuthState as jest.Mock).mockReturnValue([mockUser, false]);

    render(<Dashboard />);

    // Expect ProfileWidget to be rendered
    expect(screen.getByText('Profile Widget')).toBeInTheDocument();
  });

  it('should render "No data found" if no user and loading is complete', () => {
    // Mock useAuthState to return no user, not loading
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    render(<Dashboard />);

    // Expect the "No data found" message to appear
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });
});
