import * as React from "react"
import styled from "styled-components"

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
  cursor: pointer;
`;

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <StyledLabel
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label } 