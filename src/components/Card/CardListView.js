import { StyledButton } from 'components/common/Button';
import StyledLink from 'components/common/StyledLink';
import CustomTable from 'components/common/Table';
import { useCard } from 'hooks/useCard/cardContext';
import React, { useEffect, useMemo } from 'react';

export const CardColumns = [
  {
    Header: 'Card Number',
    accessor: 'cardNumber',
    disableFilters: true,
  },
  {
    Header: 'Status',
    accessor: 'status',
    disableFilters: true,
  },
  {
    Header: 'Applied By',
    accessor: 'user.name.firstName',
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
    accessor: 'user.email',
    disableFilters: true,
  },
  {
    Header: 'Actions',
    disableFilters: true,
    disableSortBy: true,
    className: 'right-align',
    Cell: ({ row, onApprove, onReject, view }) => (
      <>
        {row.original.status === 'applied' && (
          <>
            <StyledButton
              approveBtn
              onClick={() => onApprove(row.original._id)}
            >
              Approve
            </StyledButton>
            <StyledButton rejectBtn onClick={() => onReject(row.original._id)}>
              Reject
            </StyledButton>
          </>
        )}
        <StyledLink to={`cards/${row.original._id}/view`}>View</StyledLink>
      </>
    ),
  },
];

const CardListView = () => {
  const {
    state: { cards },
    getAllCards,
    updateCard,
  } = useCard();
  useEffect(() => {
    getAllCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useMemo(() => cards, [cards]);
  const columns = useMemo(() => CardColumns, []);
  return (
    <div>
      <h1>List of Cards</h1>
      <CustomTable
        cellClassName="center-align"
        headerCellClassName="justify-center"
        actions={{
          onApprove: (id) => updateCard(id, { action: 'activate' }),
          onReject: (id) => updateCard(id, { action: 'reject' }),
        }}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default CardListView;
