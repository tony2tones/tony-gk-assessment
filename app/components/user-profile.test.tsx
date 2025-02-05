import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ProfilePage from './user-profile';
import { useParams, useRouter } from 'next/navigation';
import { useAuthRedirect } from '../utils/authCheck';
import { getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

// Mocking firebase/auth and firestore functions
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({
    currentUser: { uid: 'user123' },
    onAuthStateChanged: jest.fn(),
  }),
  signOut: jest.fn(),
}));

// Mocking the firebaseConfig export
jest.mock('../utils/firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'user123' },
    onAuthStateChanged: jest.fn(),
  },
}));

// Mocking next/navigation hooks
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mocking authCheck
jest.mock('../utils/authCheck', () => ({
  useAuthRedirect: jest.fn(),
}));

// Mocking firestore functions
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

// Mocking react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe.only('ProfilePage Component', () => {
  const mockRouter = { replace: jest.fn() };
  const mockUseAuthRedirect = { user: { uid: 'user123' }, loading: false };

  beforeEach(() => {
    // Ensure mocking of useRouter
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    // Mock useAuthRedirect to return the desired mock data
    (useAuthRedirect as jest.Mock).mockReturnValue(mockUseAuthRedirect);

    // Mock the firestore functions to return mock values
    (getDoc as jest.Mock).mockReturnValue({
      exists: () => true,
      data: () => ({
        fullName: 'John Doe',
        email: 'john@example.com',
        bio: 'This is my bio.',
      }),
      id: 'user123',
    });
    (updateDoc as jest.Mock).mockReturnValue({});
  });

  it('should render the profile page', async () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'user123' });

    await act(async () => {
      render(<ProfilePage />);
    })

    await waitFor(() => {
      expect(screen.getByText('Welcome back, John')).toBeInTheDocument();
      expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
      expect(screen.getByText('Bio: This is my bio.')).toBeInTheDocument();
      expect(screen.getByText('Update details?')).toBeInTheDocument();
    });
  });

  it('should display loading state if user data is not loaded yet', () => {
    (useAuthRedirect as jest.Mock).mockReturnValue({ user: null, loading: true });

    render(<ProfilePage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it.skip('should call updateDoc when form is submitted', async () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'user123' });
    
    await act(async () => {
      render(<ProfilePage />);
    });
  
    const editButton = screen.getByText('Update details?');
    fireEvent.click(editButton);
  
    const fullNameInput = screen.getByPlaceholderText(/please enter full name/);
    fireEvent.change(fullNameInput, { target: { value: 'Jane Doe' } });
  
    const bioInput = screen.getByPlaceholderText(/please enter bio/); // Adjust the placeholder if needed
    fireEvent.change(bioInput, { target: { value: 'New bio content' } });
  
    const submitButton = screen.getByText(/Update details/);
    fireEvent.click(submitButton);
  
    // Wait for the async actions to finish and check if updateDoc was called with correct values
    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),  // You can use something more specific depending on your implementation
        expect.objectContaining({
          fullName: 'Jane Doe',
          bio: 'New bio content',
        })
      );
      expect(toast.success).toHaveBeenCalledWith('Your profile has been successfully updated!');
    });
  });
  
  

  it('should show an error if updating fails', async () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'user123' });
    (updateDoc as jest.Mock).mockRejectedValue(new Error('Update failed'));

    render(<ProfilePage />);

    const editButton = await screen.findByText('Update details?');
    fireEvent.click(editButton);

    const fullNameInput = screen.getByPlaceholderText('please enter full name');
    fireEvent.change(fullNameInput, { target: { value: 'Jane Doe' } });

    const submitButton = screen.getByText('Update details');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('An error occurred: Error: Update failed');
    });
  });

  it.skip('should redirect to dashboard if user tries to view someone else\'s profile', async () => {
    (useParams as jest.Mock).mockReturnValue({ slug: 'user123' });

    await act(async () => {
      render(<ProfilePage />);
      })

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('You are not authorized to view this profile.');
      expect(mockRouter.replace).toHaveBeenCalledWith('/dashboard');
    });
  });
});
