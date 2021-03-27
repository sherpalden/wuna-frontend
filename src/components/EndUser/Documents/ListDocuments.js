import React, { useEffect } from 'react';
import ContentHeader from 'components/common/ContentHeader';
import StyledLink from 'components/common/StyledLink';
import { Fab } from '@material-ui/core';
import CloudDownloadRoundedIcon from '@material-ui/icons/CloudDownloadRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CustomTable from 'components/common/Table';
import { useDocument } from 'hooks/useDocument/documentContext';
import styled from 'styled-components';

const StyledDownloadLink = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

function getDate(dateString) {
  if (!dateString) return '';

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const DocumentsTableColumn = [
  {
    Header: 'File Name',
    accessor: 'documentName',
    disableFilters: true,
  },
  {
    Header: 'Start Date',
    accessor: 'startDate',
    disableFilters: true,
    Cell: ({ row }) => getDate(row.original.startDate),
  },
  {
    Header: 'Expiry Date',
    accessor: 'expiryDate',
    disableFilters: true,
    Cell: ({ row }) => getDate(row.original.expiryDate),
  },
  {
    Header: 'Category',
    Cell: ({ row }) => <b>{row.original.type || ''}</b>,
  },
  {
    Header: 'Actions',
    Cell: ({ row }) => (
      <>
        <StyledDownloadLink title="Download File">
          <CloudDownloadRoundedIcon />
        </StyledDownloadLink>
      </>
    ),
  },
];

function DocumentsTable() {
  const {
    state: { documentList },
    getDocuments,
  } = useDocument();

  useEffect(() => {
    getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {documentList.length > 0 && (
        <CustomTable columns={DocumentsTableColumn} data={documentList} />
      )}
    </div>
  );
}

const ListDocuments = () => {
  return (
    <>
      <ContentHeader heading="List Documents">
        <StyledLink to={`/documents/add`}>
          <Fab color="primary" aria-label="add " variant="extended">
            <AddRoundedIcon />
            Add Document
          </Fab>
        </StyledLink>
      </ContentHeader>
      <DocumentsTable />
    </>
  );
};

export default ListDocuments;
