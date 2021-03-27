// import CopyToClipBoard from 'components/common/CopyToClipBoard';
// import ToggleHideOrShow from 'components/common/ToggleHideOrShow';
import React, { useMemo } from 'react';
import { Fab, TextField } from '@material-ui/core';
import CustomTable from 'components/common/Table';
import { matchSorter } from 'match-sorter';
import { useThirdParty } from 'hooks/useThirdParty/thirdPartyContext';
import StyledLink from 'components/common/StyledLink';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ContentHeader from '../../common/ContentHeader';
import { fullName } from '../../../utils/name';
import address from '../../../utils/address';
import { StyledButton } from 'components/common/Button';

export const ThirdPartyColumns = [
  {
    Header: 'Company Name',
    accessor: 'name',
    disableFilters: true,
    Cell: ({ row }) => <b> {row.original.name}</b>,
  },
  {
    Header: 'Contact Person',
    accessor: 'contact_name',
    disableFilters: true,
    Cell: ({ row }) => fullName(row.original.contactPerson),
  },
  {
    Header: 'Address',
    accessor: 'address',
    disableFilters: true,
    Cell: ({ row }) => address(row.original.address),
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    disableFilters: true,
    Cell: ({ row }) => row.original.phone,
  },
  {
    Header: 'ID',
    accessor: '_id',
    disableFilters: true,
    Show: false,
  },
  {
    Header: 'Actions',
    disableFilters: true,
    disableSortBy: true,
    Cell: ({ row }) => (
      <StyledLink to={`/third-parties/${row.values._id}/view`}>View</StyledLink>
    ),
  },
];

export const ThirdPartyTable = () => {
  const {
    state: { thirdPartyList },
  } = useThirdParty();

  const columns = useMemo(() => ThirdPartyColumns, []);

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  function DefaultColumnFilter({ column: { setFilter } }) {
    return (
      <div style={{ marginTop: '20px' }}>
        <TextField
          id="filled-search"
          label="Name"
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
    <CustomTable
      columns={columns}
      data={thirdPartyList}
      defaultColumn={defaultColumn}
      filterTypes={filterTypes}
      isPaginated={thirdPartyList.length >= 10}
      initialState={{ pageIndex: 0, hiddenColumns: ['_id'] }}
    />
  );
};

function ListThirdParty() {
  return (
    <>
      <ContentHeader heading="Third parties">
        <StyledLink to={`/third-parties/add`}>
          <Fab color="primary" aria-label="add" variant="extended">
            <StyledButton submitBtn>
              <AddRoundedIcon />
              Add
            </StyledButton>
          </Fab>
        </StyledLink>
      </ContentHeader>
      <ThirdPartyTable />
    </>
  );
}

export default ListThirdParty;
