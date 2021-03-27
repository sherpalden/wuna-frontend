import React from 'react';
import { IconButton } from '@material-ui/core';
import { FileCopyOutlined } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from 'react-router-dom';
import { useUsers } from 'hooks/useUser/usersContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { StyledButton } from 'components/common/Button';

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledIconButton = styled(IconButton)`
  margin-bottom: 12px;
  padding: 0px;
`;

const StyledButtonWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

function ResetEmailPasswordModal({
  openResetModal,
  handleResetClose,
  handleResetOpen,
  handleConfirmationClose,
  openConfirmationModal,
}) {
  const {
    state: { credentials },
    getUserCredential,
  } = useUsers();
  const { id } = useParams();

  const handlemodal = () => {
    getUserCredential(id);
    handleConfirmationClose();
    handleResetOpen(true);
  };

  return (
    <>
      <Dialog
        open={openResetModal}
        onClose={handleResetClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
      >
        <DialogTitle id="alert-dialog-title">
          Here are the credentials
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Here is the Reset Email and Password
          </DialogContentText>
        </DialogContent>
        <StyledDialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Email:</b> {credentials?.email}
          </DialogContentText>
          <CopyToClipboard text={credentials?.email}>
            <StyledIconButton>
              <FileCopyOutlined />
            </StyledIconButton>
          </CopyToClipboard>
        </StyledDialogContent>
        <StyledDialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Password:</b> {'*********'}
          </DialogContentText>
          <CopyToClipboard text={credentials?.password}>
            <StyledIconButton>
              <FileCopyOutlined />
            </StyledIconButton>
          </CopyToClipboard>
        </StyledDialogContent>
        <DialogActions>
          <StyledButton
            onClick={handleResetClose}
            color="secondary"
            variant="contained"
            size="small"
            autoFocus
          >
            Close
          </StyledButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirmationModal}
        onClose={handleConfirmationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure do you want to reset the user's credentials?
        </DialogTitle>
        <StyledButtonWrapper>
          <DialogActions>
            <StyledButton
              onClick={handlemodal}
              color="primary"
              submitBtn
              size="small"
              variant="contained"
              autoFocus
            >
              Yes
            </StyledButton>
          </DialogActions>
          <DialogActions>
            <StyledButton
              onClick={handleConfirmationClose}
              color="secondary"
              variant="contained"
              size="small"
              autoFocus
            >
              No
            </StyledButton>
          </DialogActions>
        </StyledButtonWrapper>
      </Dialog>
    </>
  );
}

export default ResetEmailPasswordModal;
