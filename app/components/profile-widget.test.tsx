import { fireEvent, render, screen } from '@testing-library/react';
import ProfileWidget from './profile-widget';
import { useRouter } from 'next/navigation';
import { useAuthRedirect } from '../utils/authCheck';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../utils/authCheck', () => ({
  useAuthRedirect: jest.fn(),
}));

describe('ProfileWidget', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    mockPush.mockReset();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuthRedirect as jest.Mock).mockReturnValue({ user: { id: '123' } });
  });

  it('should render the ProfileWidget with user details', async () => {
    render(<ProfileWidget uid="123" email="test@example.com" />);

    expect(screen.getByText(/User profile/)).toBeInTheDocument();
    expect(screen.getByText(/Your login details/)).toBeInTheDocument();
    expect(screen.getByText(/Email:/)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/123/)).toBeInTheDocument();
  });

  it('should render a default email message when email is not provided', () => {
    render(<ProfileWidget uid="123" email={null} />);

    expect(screen.getByText(/No email found/)).toBeInTheDocument();
  });

  it('should navigate to the profile management page when goToProfile is called', () => {
    const uid = '123';
    render(<ProfileWidget uid={uid} email="test@example.com" />); 
    const profileImage = screen.getByAltText('Profile figure');
    
    // Simulate a click to trigger goToProfile
    fireEvent.click(profileImage);

    expect(mockPush).toHaveBeenCalledWith(`/profile-management/${uid}`);
  });
});
