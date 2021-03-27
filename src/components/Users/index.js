import React, { useMemo } from 'react';
import CustomTable from 'components/common/Table';
import { matchSorter } from 'match-sorter';
import TextField from '@material-ui/core/TextField';
import { UserTableColumns, UserTableData } from './UserTable';

const Users = () => {
  const data = useMemo(() => UserTableData, []);
  const columns = useMemo(() => UserTableColumns, []);

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
      <h1>List of Users</h1>
      <CustomTable
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        filterTypes={filterTypes}
      />
    </div>
  );
};

export default Users;
