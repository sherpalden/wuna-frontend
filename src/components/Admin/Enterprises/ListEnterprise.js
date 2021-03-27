// import CopyToClipBoard from 'components/common/CopyToClipBoard';
// import ToggleHideOrShow from 'components/common/ToggleHideOrShow';
import React, { useMemo } from 'react';

import { Fab, TextField } from '@material-ui/core';
import CustomTable from 'components/common/Table';
import { matchSorter } from 'match-sorter';
import styled from 'styled-components';
import { useEnterprise } from 'hooks/useEnterprise/enterpriseContext';
import StyledLink from 'components/common/StyledLink';
import EnterpriseInfoBox from './EnterpriseInfoBox';
import ContentHeader from '../../common/ContentHeader';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { fullName } from '../../../utils/name';
import address from '../../../utils/address';
import { StyledButton } from 'components/common/Button';

const StyledHeader = styled.div`
  text-align: left;
  letter-spacing: 0px;
  color: #2e384d;
  opacity: 1;
  font-size: 28px;
  margin-right: 20px;
`;

const StyledTableHeaderWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EnterpriseColumns = [
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
    Cell: ({ row }) => (
      <> {row.original.contactPerson && row.original.contactPerson.phone} </>
    ),
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
      <StyledLink to={`/enterprises/${row.original._id}/view`}>View</StyledLink>
    ),
  },
];

export const EnterpriseTable = () => {
  const {
    state: { enterpriseList },
  } = useEnterprise();

  const columns = useMemo(() => EnterpriseColumns, []);

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
    <>
      <EnterpriseInfoBox />
      <StyledTableHeaderWrapper>
        <StyledHeader> Enterprises List </StyledHeader>
      </StyledTableHeaderWrapper>
      <CustomTable
        columns={columns}
        data={enterpriseList}
        defaultColumn={defaultColumn}
        filterTypes={filterTypes}
        isPaginated={enterpriseList.length >= 10}
        initialState={{ pageIndex: 0, hiddenColumns: ['_id'] }}
      />
    </>
  );
};

function ListEnterprise() {
  return (
    <>
      <ContentHeader heading="Enterprises">
        <StyledLink to="/enterprises/add">
          <Fab color="primary" aria-label="add" variant="extended">
            <StyledButton submitBtn>
              <AddRoundedIcon />
              Add
            </StyledButton>
          </Fab>
        </StyledLink>
      </ContentHeader>
      <EnterpriseTable />
    </>
  );
}

export default ListEnterprise;
