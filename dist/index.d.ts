import React from 'react';

interface ButtonProps {
    label: string;
}
declare const Button: ({ label }: ButtonProps) => React.JSX.Element;

declare const KismetLogo: () => React.JSX.Element;

export { Button, KismetLogo };
