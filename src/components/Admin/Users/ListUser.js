import React, { useEffect, useMemo } from 'react';
import CustomTable from 'components/common/Table';
import { matchSorter } from 'match-sorter';
import TextField from '@material-ui/core/TextField';
import { useUsers } from 'hooks/useUser/usersContext';
import { fullName } from '../../../utils/name';
import StyledLink from '../../common/StyledLink';
import ContentHeader from '../../common/ContentHeader';

const UsersTableColumns = [
  {
    Header: 'Name',
    accessor: 'name',
    disableFilters: true,
    Cell: ({ row }) => <b>{fullName(row.original.name)}</b>,
  },
  {
    Header: 'Email',
    accessor: 'email',
    disableFilters: true,
    Cell: ({ row }) => row.original.email,
  },
  {
    Header: 'Role',
    accessor: 'role',
    disableFilters: true,
    Cell: ({ row }) => row.original.role,
  },
  {
    Header: 'Account Status',
    accessor: 'accountStatus',
    disableFilters: true,
    Cell: ({ row }) => row.original.accountStatus,
  },
  {
    Header: 'Actions',
    disableFilters: true,
    disableSortBy: true,
    Cell: ({ row }) => (
      <StyledLink to={`/users/${row.original._id}/view`}>View</StyledLink>
    ),
  },
];

function UsersTable() {
  const {
    state: { users },
  } = useUsers();

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  function DefaultColumnFilter({ column: { setFilter } }) {
    return (
      <div style={{ marginTop: '20px' }}>
        <TextField
          id="filled-search"
          label="First Name"
          type="search"
          variant="outlined"
          onChange={(e) => {
            setFilter(e.target.value || undefined);
          }}
          size="small"
        />
      </div>
    );
  }

  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const filterTypes = useMemo(() => ({ fuzzyText: fuzzyTextFilterFn }), []);

  return (
    <div>
      {users.length > 0 && (
        <CustomTable
          columns={UsersTableColumns}
          data={users}
          defaultColumn={defaultColumn}
          filterTypes={filterTypes}
        />
      )}
    </div>
  );
}

function ListUser() {
  const { getUsers } = useUsers();
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ContentHeader heading="List Users" />
      <UsersTable />
    </>
  );
}

export default ListUser;
