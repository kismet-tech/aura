import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const LogoSvg = styled.svg<{ size?: number }>`
  width: ${(props) => props.size || 40}px;
  height: ${(props) => props.size || 40}px;
`;

const LogoLine = styled.line<{ index: number }>`
  stroke: currentColor;
  stroke-width: ${(props) => 3 - props.index * 0.2}px;
  stroke-linecap: round;
`;

export interface LogoKismetProps {
  size?: number;
  color?: string;
  className?: string;
}

export const LogoKismet: React.FC<LogoKismetProps> = ({
  size = 40,
  color = "currentColor",
  className,
}) => {
  const lines = Array.from({ length: 12 });
  const radius = size / 2 - 6; // Adjust radius based on size

  return (
    <LogoContainer className={className}>
      <LogoSvg
        size={size}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color }}
      >
        {lines.map((_, i) => {
          const angle = i * 30 * (Math.PI / 180);
          const x1 = 20 + radius * Math.sin(angle);
          const y1 = 20 - radius * Math.cos(angle);
          const x2 = 20 + (radius - 6) * Math.sin(angle);
          const y2 = 20 - (radius - 6) * Math.cos(angle);

          return <LogoLine key={i} index={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </LogoSvg>
    </LogoContainer>
  );
};
