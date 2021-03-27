import React from 'react';
import { useTable, useFilters, usePagination, useSortBy } from 'react-table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

const StyledTableHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1rem;

  &.justify-center {
    justify-content: center;
  }
`;

const StyledKeyboardArrowDownRoundedIcon = styled(KeyboardArrowDownRoundedIcon)`
  vertical-align: middle;
`;

const StyledKeyboardArrowUpRoundedIcon = styled(KeyboardArrowUpRoundedIcon)`
  vertical-align: middle;
`;

const StyledTableHeaderWithFilter = styled.div``;
const StyledTableHeaderWithSort = styled.div``;

const StyledTable = withStyles((theme) => ({
  root: {
    borderCollapse: 'separate',
    borderSpacing: '0px 8px',
  },
}))(Table);

const StyledTableCell = withStyles((theme) => ({
  head: {
    textAlign: 'left',
    letterSpacing: '1.12px',
    color: '#BFC5D2',
    textTransform: 'uppercase',
    opacity: '1',
    fontSize: '12px',
  },
  root: {
    border: '0px',
    '&.center-align': {
      textAlign: 'center',
    },
  },
  body: {
    fontSize: '15px',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: '1px',
    opacity: '1',
    border: '1px solid red',
  },
}))(TableRow);

function CustomTable({
  columns,
  data = [],
  defaultColumn,
  filterTypes,
  isPaginated = true,
  initialState = {},
  actions = {},
  cellClassName = '',
  headerCellClassName = '',
}) {
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const tableRows = isPaginated ? tableInstance.page : tableInstance.rows;

  const handleRowsPerPageChange = (event) => {
    tableInstance.setPageSize(parseInt(event.target.value));
    tableInstance.gotoPage(0);
  };

  return (
    <>
      <StyledTable {...tableInstance.getTableProps()}>
        <TableHead>
          {tableInstance.headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <StyledTableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <StyledTableHeaderWrapper className={headerCellClassName}>
                    <StyledTableHeaderWithFilter>
                      {column.render('Header')}
                      {column.canFilter ? column.render('Filter') : null}
                    </StyledTableHeaderWithFilter>
                    <StyledTableHeaderWithSort>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <StyledKeyboardArrowDownRoundedIcon />
                        ) : (
                          <StyledKeyboardArrowUpRoundedIcon />
                        )
                      ) : null}
                    </StyledTableHeaderWithSort>
                  </StyledTableHeaderWrapper>
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...tableInstance.getTableBodyProps()}>
          {tableRows.map((row) => {
            tableInstance.prepareRow(row);
            return (
              <StyledTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <StyledTableCell
                      {...cell.getCellProps()}
                      className={cellClassName}
                    >
                      {cell.render('Cell', {
                        ...actions,
                      })}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </StyledTable>
      {isPaginated && (
        <TablePagination
          component="div"
          count={data.length}
          page={tableInstance.state.pageIndex}
          onChangePage={(event, value) => tableInstance.gotoPage(value)}
          rowsPerPage={tableInstance.state.pageSize}
          rowsPerPageOptions={[10, 25, 100]}
          onChangeRowsPerPage={handleRowsPerPageChange}
        />
      )}
    </>
  );
}

export default CustomTable;
