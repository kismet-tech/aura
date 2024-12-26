import * as React from "react"
import styled from "styled-components"

const StyledInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #1a202c;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }

  &::placeholder {
    color: #a0aec0;
  }

  &:disabled {
    background: #f7fafc;
    cursor: not-allowed;
  }
`;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <StyledInput
        type={type}
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input } 