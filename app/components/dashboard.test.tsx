import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Dashboard from './dashboard';
import '@testing-library/jest-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import the hook

jest.mock('./profile-widget', () => {
  return jest.fn(() => <div>Profile Widget</div>);
});

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  initializeApp: jest.fn(),
}));

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

describe('Dashboard Component', () => {
  let mockReplace: jest.Mock;

  beforeEach(() => {
    mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, true]);

    render(<Dashboard />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should redirect to sign-in page if no user is authenticated', async () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    render(<Dashboard />);

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/sign-in'));
  });

  it('should render ProfileWidget when user is authenticated', () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    (useAuthState as jest.Mock).mockReturnValue([mockUser, false]);

    render(<Dashboard />);

    expect(screen.getByText('Profile Widget')).toBeInTheDocument();
  });

  it('should render "No data found" if no user and loading is complete', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false]);

    render(<Dashboard />);

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });
});
