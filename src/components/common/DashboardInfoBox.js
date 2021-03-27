import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  day: {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(140, 84, 255, 0.1)',
    height: '50px',
    width: '50px',
  },
  month: {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(0, 193, 212, 0.1)',
    height: '50px',
    width: '50px',
  },
  year: {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(247, 193, 55, 0.1)',
    height: '50px',
    width: '50px',
  },
}));

const StyledPaper = styled.div`
  padding: 24px 0px 24px 24px;
  width: 100%;
  box-shadow: 0;
  background: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Number = styled.div`
  text-align: left;
  letter-spacing: -0.6px;
  opacity: 1;
  font-size: 48px;
`;

const Date = styled.div`
  text-align: left;
  letter-spacing: 0px;
  opacity: 1;
  font-size: 15px;
  color: #8798ad;
`;

const NumberDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const DashboardInfoBox = ({ value, initial, label, name }) => {
  const classes = useStyles();

  return (
    <StyledPaper>
      <Wrapper>
        <div>
          <Avatar className={classes[name]}>{initial}</Avatar>
        </div>
        <NumberDateWrapper>
          <Number>{value}</Number>
          <Date>{label}</Date>
        </NumberDateWrapper>
      </Wrapper>
    </StyledPaper>
  );
};

export default DashboardInfoBox;
