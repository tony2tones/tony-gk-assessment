import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './input-field';

describe('InputField', () => {
  it('should render the input with correct label and placeholder', () => {
    render(<InputField
      name="username"
      label="Username"
      type="text"
      value="testUser"
      placeholder="Enter username"
      required={false}
      onChange={() => { }}
    />)

    expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter username/)).toBeInTheDocument();
  });
  it('should call onChange when typing into the input field', () => {
    const mockOnChange = jest.fn();
    render(<InputField
      name="username"
      label="Username"
      type="text"
      value="testUser"
      placeholder="Enter username"
      required={false}
      onChange={mockOnChange}
    />)
    const input = screen.getByLabelText(/Username/i);

    fireEvent.change(input, {target:{value:'newUserName'}});
      expect(mockOnChange).toHaveBeenCalledWith('newUserName');
  });

  it('should display "*" next to the label if the field is required', () => {
    render(<InputField 
      name="email" 
      label="Email" 
      type="email" 
      value="test@example.com" 
      placeholder="Enter email" 
      required={true} 
      onChange={() => {}} 
    />);

    expect(screen.getByText(/Email/).textContent).toBe('Email *');
  });

  it('should render input with correct attributes like maxLength and minLength', () => {
    render(<InputField 
      name="username" 
      label="Username" 
      type="text" 
      value="testUser" 
      placeholder="Enter username" 
      maxLength={20} 
      minLength={3} 
      required={false} 
      onChange={() => {}} 
    />);

    const input = screen.getByLabelText(/Username/i);

    // Check that the maxLength and minLength are set correctly
    expect(input).toHaveAttribute('maxLength', '20');
    expect(input).toHaveAttribute('minLength', '3');
  });
})