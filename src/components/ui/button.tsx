import * as React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  transition: all 0.2s ease;
  padding: 10px 16px;
  background: #3182ce;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #2c5282;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ebf8ff, 0 0 0 4px #3182ce;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.w-full {
    width: 100%;
  }

  &.mt-4 {
    margin-top: 16px;
  }
`;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <StyledButton
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 