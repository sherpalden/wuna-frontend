import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const StyledButton = styled(Button)`
  color: ${({ rejectBtn, approveBtn, disableBtn, submitBtn }) => {
    switch (true) {
      case rejectBtn:
        return '#2E5BFF';
      case approveBtn:
        return '#33AC2E';
      case disableBtn:
        return '#D63649';
      case submitBtn:
        return '#ffffff';
      default:
        return '#2E5BFF';
    }
  }};
`;
