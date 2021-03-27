import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const StyledLoaderWrapper = styled.div`
  margin-left: 20px;
`;

const Loader = (props) => {
  return (
    <StyledLoaderWrapper>
      <CircularProgress {...props} size={20} />
    </StyledLoaderWrapper>
  );
};

export default Loader;
