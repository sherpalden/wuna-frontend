import { createMuiTheme } from '@material-ui/core/styles';

import palette from './palette';
import MuiButton from './overrides/MuiButton';
import MuiCard from './overrides/MuiCard';

export default createMuiTheme({
  palette,
  overrides: {
    MuiButton,
    MuiCard,
  },
});
