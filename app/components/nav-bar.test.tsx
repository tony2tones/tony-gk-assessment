import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavBar from './nav-bar';
import { useAuthRedirect } from '../utils/authCheck';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig'; 

// Mock the `initializeApp`, `getApps`, `getApp` from 'firebase/app' and `getAuth` from 'firebase/auth'
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn().mockReturnValue([]),
  getApp: jest.fn(),
}));

// Mock `firebase/auth` to mock getAuth and signOut
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({
    currentUser: { uid: 'user123' },
    onAuthStateChanged: jest.fn(),
  }),
  signOut: jest.fn(),
}));

// Mock the auth export from firebaseConfig to return the mocked auth object
jest.mock('../utils/firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'user123' },
    onAuthStateChanged: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../utils/authCheck', () => ({
  useAuthRedirect: jest.fn(),
}));

describe('NavBar Component', () => {
  const mockRouter = { push: jest.fn(), replace: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should render the navbar correctly when user is authenticated', () => {
    (useAuthRedirect as jest.Mock).mockReturnValue({ user: { uid: 'user123' }, loading: false });

    render(<NavBar />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should navigate to the dashboard when the Dashboard button is clicked', () => {
    (useAuthRedirect as jest.Mock).mockReturnValue({ user: { uid: 'user123' }, loading: false });

    render(<NavBar />);

    const dashboardButton = screen.getByText('Dashboard');
    fireEvent.click(dashboardButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
  });

  it('should redirect to sign-in if user is not authenticated', async () => {
    (useAuthRedirect as jest.Mock).mockReturnValue({ user: null, loading: false });

    render(<NavBar />);

    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/sign-in');
    });
  });

  it('should call signOut when the Logout button is clicked', async () => {
    (useAuthRedirect as jest.Mock).mockReturnValue({ user: { uid: 'user123' }, loading: false });

    render(<NavBar />);

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalledWith(auth);
  });
});
