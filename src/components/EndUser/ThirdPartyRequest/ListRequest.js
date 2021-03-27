import React, { useEffect, useMemo } from 'react';
import CustomTable from 'components/common/Table';
import { useRequest } from 'hooks/useRequest/requestContext';
import { StyledButton } from 'components/common/Button';
import { ThirdPartyUserStatus } from 'constant';

export const CardColumns = [
  {
    Header: 'Name',
    accessor: 'name',
    disableFilters: true,
    Cell: ({ row }) => <>{row.original?.thirdParty?.name}</>,
  },
  {
    Header: 'Email',
    accessor: 'email',
    disableFilters: true,
    Cell: ({ row }) => <>{row.original?.thirdParty?.email}</>,
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    disableFilters: true,
    Cell: ({ row }) => <>{row.original?.thirdParty?.phone}</>,
  },
  {
    Header: 'Contact Person',
    accessor: 'contactPerson',
    disableFilters: true,
    Cell: ({ row }) => (
      <>
        {row.original?.thirdParty?.contactPerson?.firstName}{' '}
        {row.original?.thirdParty?.contactPerson?.lastName}
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
    Cell: ({ row, onApprove, onReject }) => (
      <>
        {!(
          row.original.status === ThirdPartyUserStatus.REJECTED ||
          row.original.status === ThirdPartyUserStatus.ACCEPTED
        ) ? (
          <>
            <StyledButton
              approveBtn
              color="secondary"
              onClick={() => onApprove(row.original._id)}
            >
              Approve
            </StyledButton>
            <StyledButton
              disableBtn
              color="secondary"
              onClick={() => onReject(row.original._id)}
            >
              Reject
            </StyledButton>
          </>
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
    updateThirdPartyUser,
    getThirdPartyUserList,
  } = useRequest();

  useEffect(() => {
    getThirdPartyUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = (id, data) => {
    updateThirdPartyUser(id, data);
  };
  const columns = useMemo(() => CardColumns, []);
  return (
    <CustomTable
      cellClassName="center-align"
      headerCellClassName="justify-center"
      actions={{
        onApprove: (id) =>
          updateStatus(id, { status: ThirdPartyUserStatus.ACCEPTED }),
        onReject: (id) =>
          updateStatus(id, { status: ThirdPartyUserStatus.REJECTED }),
      }}
      columns={columns}
      data={thirdPartyUsers}
    />
  );
}

export default ListRequest;
