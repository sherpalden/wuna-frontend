import styled from 'styled-components';
import {
  Card as MuiCard,
  CardActions as MuiCardActions,
  CardContent as MuiCardContent,
} from '@material-ui/core';

export const Card = styled(MuiCard)`
  && {
    padding: 2rem;
  }
`;

export const CardContent = styled(MuiCardContent)`
  && {
    padding: 0;
  }
`;

export const CardActions = styled(MuiCardActions)`
  && {
    padding: 0;
    margin-top: 2rem;
  }
`;
