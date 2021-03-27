import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import { StyledButton } from 'components/common/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const CopyToClipBoard = ({ value, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      {children}
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <React.Fragment>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={() => setOpen(false)}
            open={open}
            disableTouchListener
            title="Copied"
          >
            <CopyToClipboard text={value}>
              <StyledButton onClick={() => setOpen(true)}>
                <FileCopyRoundedIcon size={15} />
              </StyledButton>
            </CopyToClipboard>
          </Tooltip>
        </React.Fragment>
      </ClickAwayListener>
    </React.Fragment>
  );
};

export default CopyToClipBoard;
