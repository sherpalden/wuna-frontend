import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { useAuth } from 'hooks/useAuth/authContext';
import LoginForm from 'components/common/LoginForm';
import LogoSrc from 'images/holdaccess-main-logo-1.jpg';
import OutlinedAlert from 'components/common/Alert';

const LoginHeader = styled.div`
  height: 20px;
  margin-bottom: 150px;
`;

const LoginWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledPaperWrapper = styled(Paper)`
  && {
    padding: 2%;
    width: 550px;
    box-shadow: 0 2px 6px 0 rgb(32 33 36 / 28%);
  }
`;

export default function Login() {
  const {
    state: {
      login: { error, loading },
    },
    login,
  } = useAuth();

  return (
    <LoginWrapper>
      <LoginHeader>
        <img src={LogoSrc} alt="Logo" height="150" width="200" />
      </LoginHeader>
      <StyledPaperWrapper>
        {error && <OutlinedAlert alertType="error" message={error} />}
        <LoginForm type="login" onSubmit={login} loading={loading} />
      </StyledPaperWrapper>
    </LoginWrapper>
  );
}
