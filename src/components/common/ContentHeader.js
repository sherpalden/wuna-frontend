import React from 'react';
import styled from 'styled-components';
import { Typography, IconButton } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

const Container = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIconButton = styled(IconButton)`
  && {
    margin-right: 0.5rem;
  }
`;

function ContentHeader({ heading, handleBack, children }) {
  const showBack = typeof handleBack === 'function';

  return (
    <Container>
      <HeadingContainer>
        {showBack ? (
          <StyledIconButton onClick={handleBack} aria-label="back">
            <ArrowBackRoundedIcon />
          </StyledIconButton>
        ) : null}
        <Typography variant="h4">{heading}</Typography>
      </HeadingContainer>
      <div>{children}</div>
    </Container>
  );
}

export default ContentHeader;
