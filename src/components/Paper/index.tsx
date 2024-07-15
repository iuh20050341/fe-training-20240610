import React from "react";
import styled from "styled-components";

const StyledPaper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
`;

type PaperProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Paper: React.FC<PaperProps> = ({ children, className, style }) => {
  return (
    <StyledPaper className={className} style={style}>
      {children}
    </StyledPaper>
  );
};

export default Paper;
