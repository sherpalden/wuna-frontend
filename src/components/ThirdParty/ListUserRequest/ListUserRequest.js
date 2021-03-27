import React, { useEffect, useMemo } from 'react';
import CustomTable from 'components/common/Table';
import { useRequest } from 'hooks/useRequest/requestContext';
import StyledLink from 'components/common/StyledLink';
import { makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    marginTop: 20,
  },
}));

export const CardColumns = [
  {
    Header: 'Name',
    accessor: 'name',
    disableFilters: true,
    Cell: ({ row }) => (
      <>
        {row.original?.user?.name?.firstName}{' '}
        {row.original?.user?.name?.lastName}
      </>
    ),
  },
  {
    Header: 'Email',
    accessor: 'email',
    disableFilters: true,
    Cell: ({ row }) => <>{row.original?.user?.email}</>,
  },
  {
    Header: 'Address',
    accessor: 'address',
    disableFilters: true,
    Cell: ({ row }) => (
      <>
        {row.original?.user?.address?.addressLine1}
        {','}
        {row.original?.user?.address?.addressLine2}
      </>
    ),
  },
  {
    Header: 'Contact Person',
    accessor: 'contactPerson',
    disableFilters: true,
    Cell: ({ row }) => (
      <>
        {row.original?.user?.name?.firstName}{' '}
        {row.original?.user?.name?.lastName}
      </>
    ),
  },
  {
    Header: 'Status',
    accessor: 'status',
    disableFilters: true,
    Cell: ({ row }) => <>{row.original?.status}</>,
  },
  {
    Header: 'Actions',
    disableFilters: true,
    disableSortBy: true,
    className: 'right-align',
    Cell: ({ row, onView }) => (
      <>
        {row.original.status === 'ACCEPTED' ? (
          <StyledLink to={`/request/${row.original?.user?._id}/usersdetails`}>
            View
          </StyledLink>
        ) : (
          '-'
        )}
      </>
    ),
  },
];

function ListRequest() {
  const {
    state: { thirdPartyUsers },
    getThirdPartyUserList,
  } = useRequest();

  useEffect(() => {
    getThirdPartyUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();

  const columns = useMemo(() => CardColumns, []);
  return (
    <>
      <Typography variant="h4">User Requests</Typography>
      <Paper elevation={0} className={classes.root}>
        <CustomTable
          cellClassName="center-align"
          headerCellClassName="justify-center"
          columns={columns}
          data={thirdPartyUsers}
        />
      </Paper>
    </>
  );
}

export default ListRequest;
