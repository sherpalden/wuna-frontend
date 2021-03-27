import palette from '../palette';

const MuiButton = {
  root: {
    fontSize: '15px',
    borderRadius: '4px',
    padding: '11px 16px',
    fontWeight: '500',
    textTransform: 'none',
  },
  contained: {
    boxShadow: 'none',
  },
  containedPrimary: {
    '&:hover': {
      backgroundColor: palette.primary.main,
    },
    '&:active': {
      backgroundColor: palette.primary.main,
    },
  },
  containedSecondary: {
    color: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.secondary.main,
    },
    '&:active': {
      backgroundColor: palette.secondary.main,
    },
  },
};

export default MuiButton;
